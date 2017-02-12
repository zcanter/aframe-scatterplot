# WebVR Drag and Drop Scatterplot 
Utilizing the [a-scatterplot] A-Frame component this project makes a quick visualzation of JSON data. See it [here].


- introduction
- formatting
- usage
- reference?



### Introduction

This tool makes 3D data visualizations which can be viewed in virtual reality in the browser. At the time of this writing it's browser support is sort of experimental. If you do have a VR headset here is a tutorial on how to make it work. Hopefully by the time you are reading this WebVR support is more mainstream. Check it's standardization [here].

This tool was built using the a-scatterplot component which is an emeddable html entity using A-Frame io created by Mozilla. If you would like to utize that check out the [github].

### Usage

The preloaded example dataset contains the values of sea surface temperature readings at a 1km resolution. It is possible to drag your own data in as you would like.

In order to visualize your data set it must be formatted like so:


#### Browser Installation

Install and use by directly including the [browser file](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/zcanter/aframe-gradient-sky/master/dist/gradientsky.min.js"></script>
</head>

<body>
  <a-scene>
    <a-gradient-sky material="shader: gradient; topColor: 255 0 0; bottomColor: 0 121 255;"></a-gradient-sky>
  </a-scene>
</body>
```

### API

| Property   | Description | Default Value |
| ---------- | ----------- | ------------- |
| enabled | Boolean – defines if the Orbit Controls are used | false
| target | String – the object the camera is looking at | '' |
| distance | Number – the distnace of the camera to the target | 1 |
| enableRotate | Boolean – defines if the camera can be rotated | true |
| rotateSpeed | Number – rotation speed | 1 |
| enableZoom | Boolean – defines if the camera can be zoomed in or out | true |
| zoomSpeed | Number – zoom speed | 1 |
| enablePan | Boolean – defines if the camera can be panned (using the arrow keys) | true |
| keyPanSpeed | Number – panning speed | 7 |
| enableDamping | Boolean – defines if the rotational movement of the camera is damped / eased | false |
| dampingFactor | Number – damping factor | 0.25 |
| autoRotate | Boolean – defines if the camera automatically rotates around the target | false |
| autoRotateSpeed | Number – speed of the automatic rotation | 2 |
| enableKeys | Boolean – defines if the keyboard can be used | true |
| minAzimuthAngle | Number – minimum azimuth angle | -Infinity |
| maxAzimuthAngle | Number – maximum azimuth angle | Infinity |
| minPolarAngle | Number – minimum polar angle | 0 |
| maxPolarAngle | Number – maximum polar angle | Math.PI |
| minZoom | Number – minimum zoom value | 0 |
| maxZoom | Number – maximum zoom value | Infinity |
| minDistance | Number – minimum distance | 0 |
| maxDistance | Number – maximum distance | Infinity |
