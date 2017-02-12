# VR-enabled Drag and Drop JSON data visualizer
Utilizing the [a-scatterplot] A-Frame component this project makes a quick visualzation of JSON data.


- introduction
- formatting
- usage



### Description

Quick visualiztion of your JSON dataset. 

### Usage

The preloaded example dataset contains the values of sea surface temperature readings at a 1km resolution. It is possible to drag your own data in as you would like.


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
