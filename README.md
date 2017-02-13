# AFrame - Scatterplot

### Introduction

This tool allows users to create web-based VR-enabled data visualiztions by dragging and dropping JSON datasets into the browser window. It is both an end user visualzation tool and an example implementation of the [a-scatterplot](https://github.com/zcanter/aframe-scatterplot) AFrame VR component. 

It is important to note that if you intend to use the VR capabilities of this tool, you need to have a browser that implements the experimental WebVR JavaScript API. Check [here](https://webvr.info/) for information on how to get a WebVR enabled browser.

Also to use this tool you must have a browser that supports WebGL. Most modern browsers support WebGL but you can double check [here](https://get.webgl.org/).

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

The easiest way to do this is to get a CSV of your dataset and use the online CSV to JSON conversion tool [convertcsv](http://www.convertcsv.com/csv-to-json.htm). If you are a programmer you can use your favorite language to do so as well. Most popular programming languages have JSON writing capabilites of some sort.

*How can I get a CSV export of my data?*

The easiest way to get a CSV export is to open your data in Excel or Google Sheets and export as it a CSV file. You can also do this programmatically in your favorite language.

*Can I only use geospacial data?*

No, you can use non-geospacial data as long as it is formatted in the style shown above. It is important to note though that if two spacial dimensions share a unit of measurement (i.e. x and y dimensions are both in kelvin) you should specify this in the relationship option (detailed in options below).

*How many fields can I have?*

You may have as many fields as you like, but note you can only visualize three spacial dimensions and one color mapped dimension at any given time.

*How many points can my dataset have?*

We have experimented with over 5 million data points with no problems.

*Do I need to normalize or scale my values?*

No, the a-scatterplot component will do that for you programmatically. It is totally fine for you to leave the values at thier original readings.

*Where can I find example data?*

Example datasets can be found [here](https://github.com/zcanter/aframe-scatterplot/tree/master/example/sample-data).

### Options

| Property   | Example | Description | Default Value |
| ---------- | ----------- | ------------- | ------------- |
| title | Sea Surface Temperature | Title of the dataset | undefined
| x | lat | X dimension from field name | undefined |
| y | val | Y dimension from field name | undefined |
| z | lon | Z dimension from field name | undefined |
| val | val | Color mapped dimension from field name | undefined |
| colorpreset | jet | Name of the color map preset | jet |
| fillval | -32768, 4506 | Number (or numbers) representing fill values/ignored values seperated by comma | none |
| relationship | xz | Dimensions that share units of measurements | none |
| pointSize | 3.5 | Size of the rendered data point | 1 |

### Questions or Issues?

Feel free to open a GitHub Issue or to contact me directly at zrcanter [-at-] gmail
