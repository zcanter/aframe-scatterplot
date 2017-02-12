# 3D VR-enabled Drag and Drop JSON visualization
A gradient sky component for the A-Frame WebVR Framework.

Check out the: [Gradient Sky Example](https://zcanter.github.io/aframe-gradient-sky/)

### Usage

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
