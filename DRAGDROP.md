# VR-enabled Drag and Drop JSON Data Visualizer
Utilizing the [a-scatterplot] A-Frame component this project makes a quick visualzation of JSON data.


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

#### NPM Installation

Install via NPM:

```bash
npm install aframe-gradient-sky
```

Then register and use.

```js
require('aframe');
require('aframe-gradient-sky');
