# AFrame - Scatterplot

### Introduction

An all-purpose data visualization component for the [AFrame](https://aframe.io/) WebVR Framework.

Check out the example drag and drop application: https://zcanter.github.io/vr-scatterplot/

There is also a full example, with orbit-cam, in ./examples/example2.html

![A-Frame Scatterplot](https://cloud.githubusercontent.com/assets/5613001/22870157/da185304-f159-11e6-94ba-7e9a33f9dd02.png)

#### Browser Installation

Install and use by directly including the [browser file](dist):

You must also include a link the [D3](https://d3js.org/) JavaScript data visualization framework.

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.1/d3.min.js"></script>
  <script src="https://cdn.rawgit.com/zcanter/aframe-scatterplot/master/dist/a-scatterplot.min.js"></script>
</head>

<body>
  <a-scene>
    <a-scatterplot src="url(example.json)" x="field1" y="field2" z="field3" val="field4"></a-scatterplot>
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe
npm install d3
npm install aframe-scatterplot
```

Then register and use.

```js
require('aframe');
require('d3');
require('aframe-scatterplot');
```

### Data Formatting

Datasets should be formatted as follows:


```javascript
[
 {
   // Data Point
   "Field1": 13.90738679789567,
   "Field2": 11.77935227940546,
   "Field3": 12.02052097080796,
   "Field4": 11.31274091176219,
   "Field5": 14.13415151546462,
 },
 {
   // Data Point
   "Field1": 12.29829187876160,
   "Field2": 10.12398967761787,
   "Field3": 16.81298749861520,
   "Field4": 13.92371645984898,
   "Field5": 11.35138647618786,
 },
 {...},
 {...},
 ]
```

Example (Sea Surface Temperature 1km resolution):

```javascript
[
 {
   "lat":-80,
   "lon":-180,
   "val":-108
 },
 {
   "lat":-80,
   "lon":-179,
   "val":-103
 },
 {...},
 {...},
 ]
```

*How can I format my data in this way?*

The easiest way to do this is to get a CSV of your dataset and use the online CSV to JSON conversion tool [convertcsv](http://www.convertcsv.com/csv-to-json.htm). If you are a programmer you can use your favorite language to do so as well. Most popular programming languages have JSON writing capabilities of some sort.

*How can I get a CSV export of my data?*

The easiest way to get a CSV export is to open your data in Excel or Google Sheets and export as it a CSV file. You can also do this programmatically in your favorite language.

*Can I only use geospatial data?*

No, you can use non-geospatial data as long as it is formatted in the style shown above. It is important to note though that if two spacial dimensions share a unit of measurement (i.e. x and y dimensions are both in kelvin) you should specify this in the relationship option (detailed in API below).

*How many fields can I have?*

You may have as many fields as you like, but note you can only visualize three spacial dimensions and one color mapped dimension at any given time.

*How many points can my dataset have?*

We have experimented with over 5 million data points with no problems.

*Do I need to normalize or scale my values?*

No, the a-scatterplot component will do that for you programmatically. It is totally fine for you to leave the values at their original readings.

*Where can I find example data?*

Example datasets can be found [here](https://github.com/zcanter/aframe-scatterplot/tree/master/example/sample-data).

*I'm confused mapping my X/Y/Z axis data to Aframe's X/Y/Z space*

AFrame's coordinate system starts X,Y at the lower lefthand corner, and Z values increasing toward the camera. The scatterplot component uses this axis system.
Further complicating this is the fact that the title and color bar are oriented relative to the Z axis in AFrame space, not to the X axis as you normally expect in a scatterplot. This is because the plot was initially designed for use with geospatial data in which X and Y values are usually latitude and longitude.

Therefore, a nice initial setting for the axes mappings is:
```
X axis (left/right on screen): Your Y axis values
Z axis (toward camera): your X-axis values
Y axis (up/down on screen): Your Z values
```
So the component attributes will be like

   x="y"  y="z" z="x" val="z" xlabel="My Y Axis" ylabel="My Z axis" zlabel="My X axis"

and add

   rotation="0 90 0"

to pivot the whole thing so that the title and color bar are placed correctly.

If your X and Y values have the scame scale, add

   relationship="zx"

If you want to make the vertical hieght shorter than the X/Y size, set

   scale="1 0.5 1

Setting a nice location for an orbit-controls lookat target is a bit tricky, but see example2.html for a working example.

### API

| Property   | Example | Description | Default Value |
| ---------- | ----------- | ------------- | ------------- |
| src | url(data.json) | The path to the data set | none |
| title | Sea Surface Temperature | Title of the dataset | undefined
| x | lat | X dimension from field name | undefined |
| y | val | Y dimension from field name | undefined |
| z | lon | Z dimension from field name | undefined |
| s | size | Point size from field name | undefined |
| val | val | Color mapped dimension from field name | undefined |
| colorpreset | jet | Name of the color map preset | jet |
| fillval | -32768, 4506 | Number (or numbers) representing fill values/ignored values separated by comma | none |
| relationship | xz | Dimensions that share units of measurements | none |
| pointSize | 3.5 | Size of the rendered data point | 1 |
| pointcolor | "rgb(255,0,0)" | Color all the points with the same color. If specified, colorpreset is ignored. This should be a string that is parsable by the THREE.Color() function | [] |
| pointsprite | dist/img/ball.png | URL of the image to use to render each point.  If you do not specify point sizes, by default this component will use the THREE.PointMaterial to render the points as pixels, not sprites. If you specify point sizes or specify this sprite | dist/img/ball.png |
| raw | [{lat: -79, lon: 180, val: 103},...] | The raw data in a JS object array | none |
| xfill | -45, 63 | Fill or ignored values in X dimension | none|
| yfill | -78 | Fill or ignored values in Y dimension | none|
| zfill | 12 | Fill or ignored values in Z dimension | none|
| xLimit | 0.7 | Limit of relative X dimension width in 3D space | 1|
| yLimit | 0.5 | Limit of relative Y dimension width in 3D space | 1|
| zLimit | 0.2 | Limit of relative Z dimension width in 3D space | 1|
| xFlip | true | Invert the X shape | false |
| yFlip | true | Invert the Y shape | false |
| zFlip | true | Invert the Z shape | false |
| xlabel | "aframe X / my Y" | label along the X axis (see discussion about Axes) | none |
| ylabel | "aframe Y / my Z" | label along the Y axis (see discussion about Axes) | none |
| zlabel | "aframe Z / my X" | label along the Z axis (see discussion about Axes) | none |
| numdecimalplaces | 1 | Number of decimal points to show in axis numbering and color bar | 4 |
| showcolorbar | false | Show the color bar? | true|
| nochrome | true | Turn off rendering of axes, tics, title, and color bar? Useful if you want to create a second scatterplot directly on top of another one. | false |
| showTicks | false | Show tick marks and labels? | true |
| showTickLabels | false | Show tick mark labels? | true |
| textColor | #F00 | Color for text | #000 |
| ycage | true | Draw vertical frame around plot | false |
| showFloor | true | Draw a floor on the graph | false |
| floorMaterialParams | | Parameters passed to the foor material | "color: #fff; opacity:0.5; transparent:true;" |




### Questions or Issues?

Feel free to open a GitHub Issue or to contact me directly at zrcanter [-at-] gmail

### Special Thanks

Thank you to the NASA-JPL Instrument Data Systems VR working group for helping in the creation of this tool. Also thanks to [Dan Moran](https://github.com/morandd) for his awesome additions to this project! Check out his [AFrame-Heatmap](https://github.com/morandd/aframe-heatmap3d/) visualizer as well! 
