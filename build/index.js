var createText = require('three-bmfont-text')
var loadFont = require('load-bmfont')
var colors = require('./colors.json')
var SDFShader = require('./shader/sdf')

AFRAME.registerComponent('dataplot', {
  	schema: {
  		src: { type: 'asset', default: 'none' },
  		raw: {
  			default: 'none',
    		parse: function(data) { return data }
  		},
  		title: { type: 'string' },
	    x: { type: 'string' },
	    y: { type: 'string' },
	    z: { type: 'string' },
	    val: { type: 'string' },
	    colorpreset: { default: 'jet', type: 'string' },
	    valfill: { 
			default: [],
	    	type: 'array'
	    },
	    xfill: { 
			default: [],
	    	type: 'array'
	    },
	    yfill: { 
			default: [],
	    	type: 'array'
	    },
	    zfill: { 
			default: [],
	    	type: 'array'
	    },
	    xlimit: {
	    	type: 'number',
	    	default: 1
	    },
	    ylimit: {
	    	type: 'number',
	    	default: 1
	    },
	    zlimit: {
	    	type: 'number',
	    	default: 1
	    },
	    relationship: {
	    	default: 'none',
    		type: 'string'
	    },
	    xflip: { type: 'boolean' },
	    yflip: { type: 'boolean' },
	    zflip: { type: 'boolean' },
	    pointsize: { 
	    	type: 'number',
	    	default: 1 
	    }
  	},

  	init: function() {
  		var data = this.data
  	},

	update: function (oldData) {
		var data = this.data
    	var el = this.el

    	if (data !== oldData) {
    		if (data.raw !== "none") {
				renderGeometryFromRaw(el, data)		
    		} else if (data.src !== "none") {
    			renderGeometryAndKeyFromPath(el, data)			
    		} else {
    			console.log("no data")
    		}	
    	}
    }
})

function renderGeometryAndKeyFromPath(el, data) {
	d3.json(data.src, function(json) {
		var colorPreset = "colors." + data.colorpreset
		var geometry = new THREE.Geometry()
		json.slice().reverse().forEach(function(point, index, object) {
  			if (data.valfill.indexOf(String(point[data.val])) !== -1) {
    			json.splice(object.length - 1 - index, 1);
  			}
		})
		json.slice().reverse().forEach(function(point, index, object) {
  			if (data.xfill.indexOf(String(point[data.x])) !== -1) {
    			json.splice(object.length - 1 - index, 1);
    			
  			}
		})
		json.slice().reverse().forEach(function(point, index, object) {
  			if (data.yfill.indexOf(String(point[data.y])) !== -1) {
    			json.splice(object.length - 1 - index, 1);
    			
  			}
		})
		json.slice().reverse().forEach(function(point, index, object) {
  			if (data.zfill.indexOf(String(point[data.z])) !== -1) {
    			json.splice(object.length - 1 - index, 1);
    			
  			}
		})
		var stats = getDataStats(json, data, colorPreset)
		json.forEach(function(point){
			var vertex = new THREE.Vector3()
			if (data.xflip) {
				stats.scaleX.range([stats.width, 0])
			} else {
				stats.scaleX.range([0, stats.width])
			}

			if (data.yflip) {
				stats.scaleY.range([stats.height, 0])
			} else {
				stats.scaleY.range([0, stats.height])
			}

			if (data.zflip) {
				stats.scaleZ.range([stats.depth, 0])
			} else {
				stats.scaleZ.range([0, stats.depth])
			}

			vertex.x = stats.scaleX(point[data.x])
			vertex.y = stats.scaleY(point[data.y])
			vertex.z = stats.scaleZ(point[data.z])
			geometry.vertices.push( vertex )
			var c = stats.colorScale(point[data.val])
			geometry.colors.push(new THREE.Color(c))
		})
		var material = new THREE.PointsMaterial({
			size: data.pointsize * 0.006,
			vertexColors: THREE.VertexColors
		})
		var model = new THREE.Points( geometry, material )
		makeAxisAndKey(el, data, stats)

		el.setObject3D('particles', model)
	})	
}

function makeAxisAndKey(el, data, stats) {

	var lineDim = []
	var xDim = {}
		yDim = {}
		zDim = {}
	lineDim.push(xDim, yDim, zDim)

	xDim.v = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(stats.width, 0, 0)]
	yDim.v = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, stats.height, 0)]
	zDim.v = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, stats.depth)]

	lineDim.forEach(function(dim, i){
		makeLine(el, dim.v, i, 'baseLine')
		var textHeight = 0.05
		if (i == 0) {
			var marks = Math.round(stats.width/textHeight)
			if (marks == 1) {
				marks++;
			}
			makeAxisTicks(i, dim.v, el, marks, stats.minX, stats.maxX)
		} else if (i == 1) {
			var marks = Math.round(stats.height/textHeight)
			if (marks == 1) {
				marks++;
			}
			makeAxisTicks(i, dim.v, el, marks, stats.minY, stats.maxY)
		} else if (i == 2) {
			var marks = Math.round(stats.depth/textHeight)
			if (marks == 1) {
				marks++;
			}
			makeAxisTicks(i, dim.v, el, marks, stats.minZ, stats.maxZ)
		}

	})

	var colorPreset = "colors." + data.colorpreset
	createColorKey(el, stats, colorPreset)
	createAxisLabels(el, data, stats)
}


function createAxisLabels(el, data, stats) {
	var pos = new THREE.Vector3(stats.width + 0.05,0,stats.depth)
	var objName = "title"
	var textString = data.title
	var align = "center"
	var rot = {x: THREE.Math.degToRad(90), y: THREE.Math.degToRad(0), z: THREE.Math.degToRad(-90)}
	addText(el, pos, objName, textString, align, rot)

}

function makeAxisTicks(i, dim, el, marks, min, max) {
	var axisStats = []
	var d = []

	for (m = 0; m < marks; m++) {
		var val = m / (marks - 1)
		d.push(val)
	}

	d.forEach(function(v) {
		var vScale = d3.scaleLinear().domain([0, 1]).range([min, max])
		axisStats.push(vScale(v))
	})
	makeTicks(el, d, dim, i, axisStats)
}

function makeTicks(el, d, v, i, axisStats) {
	d.forEach(function(perc, j) {
		var v1 = getPointInBetweenByPerc(v[0], v[1], perc)
		var v2;
		var v2Text;
		var objName = "" + i + "" + j
		var textString = ""
		if (i == 0) {
			v2 = new THREE.Vector3(v1.x, v1.y, v1.z - 0.03)
			v2Text = new THREE.Vector3(v1.x - 0.01, v1.y, v1.z - 0.04)
			var rot = {x: THREE.Math.degToRad(90), y: THREE.Math.degToRad(0), z: THREE.Math.degToRad(-90)}
			textString += parseFloat(axisStats[j].toFixed(4))
		} else if (i == 1) {
			v2 = new THREE.Vector3(v1.x - 0.03, v1.y, v1.z - 0.03)
			v2Text = new THREE.Vector3(v1.x - 0.75, v1.y, v1.z + 0.25)
			var rot = {x: THREE.Math.degToRad(90), y: THREE.Math.degToRad(0), z: THREE.Math.degToRad(225)}
			textString += parseFloat(axisStats[j].toFixed(4))
		} else if (i == 2) {
			v2 = new THREE.Vector3(v1.x - 0.03, v1.y, v1.z)
			v2Text = new THREE.Vector3(v1.x - 1.035, v1.y, v1.z + 1.01)
			var rot = {x: THREE.Math.degToRad(90), y: THREE.Math.degToRad(0), z: THREE.Math.degToRad(-180)}
			textString += parseFloat(axisStats[j].toFixed(4))
		}

		var nV = [v1, v2]
		makeLine(el, nV, objName, 'xLine')
		addText(el, v2Text, objName, textString, 'right', rot)
	
	})

}

function addText(el, pos, objName, textString, align, rot) {

	fontLoader({
      font: 'https://cdn.rawgit.com/bryik/aframe-bmfont-text-component/aa0655cf90f646e12c40ab4708ea90b4686cfb45/assets/DejaVu-sdf.fnt',
      image: 'https://cdn.rawgit.com/bryik/aframe-bmfont-text-component/aa0655cf90f646e12c40ab4708ea90b4686cfb45/assets/DejaVu-sdf.png'
    }, start)

	function start (font, texture) {
      texture.needsUpdate = true
      texture.anisotropy = 16

      var options = {
        font: font,
        text: textString,
        width: 1000,
        align: align,
        letterSpacing: 0,
        lineHeight: 38,
        mode: 'normal'
      }

      var geometry = createText(options)

      var material = new THREE.RawShaderMaterial(SDFShader({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        color: '#000',
        opacity: 1.0
      }))

      var text = new THREE.Mesh(geometry, material)
      
      text.scale.multiplyScalar(-0.001)
      text.rotation.set(rot.x, rot.y, rot.z)
      text.position.set(pos.x, pos.y, pos.z - 1.0)

      el.setObject3D('bmfont-text' + objName, text)
    }
}

function fontLoader (opt, cb) {
  loadFont(opt.font, function (err, font) {
    if (err) {
      throw err
    }

    var textureLoader = new THREE.TextureLoader()
    textureLoader.load(opt.image, function (texture) {
      cb(font, texture)
    })
  })
}

function createColorKey(el, stats, colorPreset) {

	var axisStatsVal = [stats.minVal, (stats.minVal + ((stats.maxVal + stats.minVal) * 0.5))/2, (stats.minVal + stats.maxVal)  * 0.5, (stats.maxVal + ((stats.maxVal + stats.minVal) * 0.5))/2, stats.maxVal]
	var v1, v2;

	var geometry = new THREE.CubeGeometry( 0.075, 0.001, 0.4)

	var texture = new THREE.Texture( generateTexture(colorPreset) )
	texture.needsUpdate = true

    var material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } )
	
	mesh = new THREE.Mesh( geometry, material )

	mesh.position.set(stats.width * 0.5, 0, stats.depth + 0.1)
	mesh.rotateY(THREE.Math.degToRad(90))

	v1 = new THREE.Vector3((stats.width * 0.5) - 0.2, 0, stats.depth + 0.1375)
	v2 = new THREE.Vector3((stats.width * 0.5) + 0.2, 0, stats.depth + 0.1375)

	var d = [0, 0.25, 0.5, 0.75, 1]

	d.forEach(function(dVal, i){
		var v1Tick = getPointInBetweenByPerc(v1, v2, dVal)
		var v2Tick = new THREE.Vector3(v1Tick.x, v1Tick.y, v1Tick.z + 0.03)
		var labelV = new THREE.Vector3(v1Tick.x - 0.01, v1Tick.y, v1Tick.z + 1.04)
		var rot = {x: THREE.Math.degToRad(90), y: THREE.Math.degToRad(0), z: THREE.Math.degToRad(-90)}
		makeLine(el,[v1Tick,v2Tick], i, "colorKeyBaseLine")
		addText(el, labelV, "colorKeyLabel" + i, "" + parseFloat(axisStatsVal[i].toFixed(4)), 'left', rot)
	})

	el.setObject3D('colorcube', mesh)

}

function generateTexture(colorPreset) {

	var size = 512

	canvas = document.createElement( 'canvas' )
	canvas.width = size
	canvas.height = size

	var colorPresetPath = eval(colorPreset)

	var context = canvas.getContext( '2d' )

	context.rect( 0, 0, size, size )
	var gradient = context.createLinearGradient( 0, 0, 0, size )

	colorPresetPath.forEach(function(c, i){
		var step = i/256
		gradient.addColorStop(step, c)
	})
	
	context.fillStyle = gradient
	context.fill()

	return canvas

}

function getPointInBetweenByPerc(pointA, pointB, percentage) {

    var dir = pointB.clone().sub(pointA)
    var len = dir.length()
    dir = dir.normalize().multiplyScalar(len*percentage)
    return pointA.clone().add(dir)

}

function makeLine(el, v, i, objName) {
	var material = new THREE.LineBasicMaterial({
		color: 0x000000,
		opacity: 0.45, 
		transparent: true, 
		depthWrite: false
	})

	var geometry = new THREE.Geometry()
	geometry.vertices = v

	var line = new THREE.Line( geometry, material )
	el.setObject3D(objName + i, line)
}

function renderGeometryFromRaw(el, data) {
	var json = JSON.parse(data.raw)
	var colorPreset = "colors." + data.colorpreset
	var geometry = new THREE.Geometry()
	json.slice().reverse().forEach(function(point, index, object) {
			if (data.valfill.indexOf(String(point[data.val])) !== -1) {
			json.splice(object.length - 1 - index, 1);
			}
	})
	json.slice().reverse().forEach(function(point, index, object) {
			if (data.xfill.indexOf(String(point[data.x])) !== -1) {
			json.splice(object.length - 1 - index, 1);
			
			}
	})
	json.slice().reverse().forEach(function(point, index, object) {
			if (data.yfill.indexOf(String(point[data.y])) !== -1) {
			json.splice(object.length - 1 - index, 1);
			
			}
	})
	json.slice().reverse().forEach(function(point, index, object) {
			if (data.zfill.indexOf(String(point[data.z])) !== -1) {
			json.splice(object.length - 1 - index, 1);
			
			}
	})
	var stats = getDataStats(json, data, colorPreset)
	json.forEach(function(point){
		var vertex = new THREE.Vector3()
		if (data.xflip) {
			stats.scaleX.range([stats.width, 0])
		} else {
			stats.scaleX.range([0, stats.width])
		}

		if (data.yflip) {
			stats.scaleY.range([stats.height, 0])
		} else {
			stats.scaleY.range([0, stats.height])
		}

		if (data.zflip) {
			stats.scaleZ.range([stats.depth, 0])
		} else {
			stats.scaleZ.range([0, stats.depth])
		}

		vertex.x = stats.scaleX(point[data.x])
		vertex.y = stats.scaleY(point[data.y])
		vertex.z = stats.scaleZ(point[data.z])
		geometry.vertices.push( vertex )
		var c = stats.colorScale(point[data.val])
		geometry.colors.push(new THREE.Color(c))
	})
	var material = new THREE.PointsMaterial({
		size: data.pointsize * 0.006,
		vertexColors: THREE.VertexColors
	})
	var model = new THREE.Points( geometry, material )
	makeAxisAndKey(el, data, stats)

	el.setObject3D('particles', model)
}

function getDataStats(json, data, colorPreset) {
	var stats = {}

	stats.minX = d3.min(json, function(d) { return d[data.x]})
	stats.maxX = d3.max(json, function(d) { return d[data.x]})
	stats.minY = d3.min(json, function(d) { return d[data.y]})
	stats.maxY = d3.max(json, function(d) { return d[data.y]})
	stats.minZ = d3.min(json, function(d) { return d[data.z]})
	stats.maxZ = d3.max(json, function(d) { return d[data.z]})
	stats.minVal = d3.min(json, function(d) { return d[data.val]})
	stats.maxVal = d3.max(json, function(d) { return d[data.val]})

	stats.totalX = Math.abs(stats.minX) + Math.abs(stats.maxX)
	stats.totalZ = Math.abs(stats.minZ) + Math.abs(stats.maxZ)
	stats.totalY = Math.abs(stats.minY) + Math.abs(stats.maxY)

	var xz = false
	var xy = false
	var yz = false
	var xyz = false

	if (data.relationship == "xy" || data.relationship == "yx") {
		xy = true
	} else if (data.relationship == "xz" || data.relationship == "zx") {
		xz = true
	} else if (data.relationship == "yz" || data.relationship == "zy") {
		yz = true
	} else if (data.relationship == "xyz" || data.relationship == "yzx" || data.relationship == "zxy" || data.relationship == "xzy" || data.relationship == "yxz" || data.relationship == "zyx") {
		xyz = true
	}

	if (xy) {
		if (stats.totalX < stats.totalY) {
			var shape = stats.totalX/stats.totalY
			stats.height = 1
			stats.width = shape
		} else {
			var shape = stats.totalY/stats.totalX
			stats.height = shape
			stats.width = 1
		}
		stats.depth = data.zlimit
	} else if (xz) {
		if (stats.totalX < stats.totalZ) {
			var shape = stats.totalX/stats.totalZ
			stats.width = shape
			stats.depth = 1
		} else {
			var shape = stats.totalZ/stats.totalX
			stats.width = 1
			stats.depth = shape
		}
		stats.height = data.ylimit
	} else if (yz) {
		if (stats.totalY < stats.totalZ) {
			var shape = stats.totalY/stats.totalZ
			stats.height = shape
			stats.depth = 1
		} else {
			var shape = stats.totalZ/stats.totalY
			stats.depth = shape
			stats.height = 1
		}
		stats.width = data.xlimit
	} else if (xyz) {
		if (stats.totalX >= stats.totalY && stats.totalX >= stats.totalZ) {
			var shape1 = stats.totalZ/stats.totalX
			var shape2 = stats.totalY/stats.totalX
			stats.width = 1
			stats.height = shape2
			stats.depth = shape1
		} else if (stats.totalY >= stats.totalZ && stats.totalY >= stats.totalX) {
			var shape1 = stats.totalZ/stats.totalY
			var shape2 = stats.totalX/stats.totalY
			stats.width = shape2
			stats.height = 1
			stats.depth = shape1
		} else if (stats.totalZ >= stats.totalY && stats.totalZ >= stats.totalX) {
			var shape1 = stats.totalX/stats.totalZ
			var shape2 = stats.totalY/stats.totalZ
			stats.width = shape1
			stats.height = shape2
			stats.depth = 1
		}
	} else {
		stats.width = data.xlimit
		stats.height = data.ylimit
		stats.depth = data.zlimit
	}

	stats.scaleX = d3.scaleLinear().domain([stats.minX, stats.maxX]).range([0, stats.width])
	stats.scaleY = d3.scaleLinear().domain([stats.minY, stats.maxY]).range([0, stats.height])
	stats.scaleZ = d3.scaleLinear().domain([stats.minZ, stats.maxZ]).range([0, stats.depth])
	
	stats.colorScale = d3.scaleQuantile().domain([stats.minVal, stats.maxVal]).range(eval(colorPreset))
	
	return stats
}

AFRAME.registerPrimitive('a-scatterplot', {
	defaultComponents: {
		dataplot: {}
	},
	mappings: {
		src: 'dataplot.src',
		raw: 'dataplot.raw',
		title: 'dataplot.title',
		x: 'dataplot.x',
		y: 'dataplot.y',
		z: 'dataplot.z',
		val: 'dataplot.val',
		colorpreset: 'dataplot.colorpreset',
		fillval: 'dataplot.valfill',
		xfill: 'dataplot.xfill',
		yfill: 'dataplot.yfill',
		zfill: 'dataplot.zfill',
		xlimit: 'dataplot.xlimit',
		ylimit: 'dataplot.ylimit',
		zlimit: 'dataplot.zlimit',
		relationship: 'dataplot.relationship',
		xflip: 'dataplot.xflip',
		yflip: 'dataplot.yflip',
		zflip: 'dataplot.zflip',
		pointsize: 'dataplot.pointsize'
	}
})

