# mp3-slice

[![npm version](https://img.shields.io/npm/v/mp3-slice.svg?style=flat-square)](https://www.npmjs.org/package/mp3-slice)
[![install size](https://packagephobia.now.sh/badge?p=mp3-slice)](https://packagephobia.now.sh/result?p=mp3-slice)
[![npm downloads](https://img.shields.io/npm/dm/mp3-slice.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mp3-slice)

MP3 file slicer for browser

<strong>Input</strong> : MP3 File || <strong>Output</strong> : WAV chunks

## Table of Contents

- [Installing](#installing)
- [Example](#example)

## Installing

Using npm:

```bash
$ npm install axios
```

Using yarn:

```bash
$ yarn add axios
```

## Example

##### Import

```js
import mp3Slice from "mp3-slice";
```

##### Slicing mp3 into seconds

```js
const mp3File = e.target.files[0];
const chunkDuration = 5; // seconds
const chunks = await mp3Slice.sliceIntoSeconds(mp3File, chunkDuration);
```

##### Trimming mp3

```js
const mp3File = e.target.files[0];
const trimFrom = 10; // seconds
const trimTo = 20; // seconds
const blob = await mp3Slice.trim(mp3File, trimFrom, trimTo);
```
