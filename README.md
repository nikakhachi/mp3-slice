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

```js
import mp3Slice from "mp3-slice";
```

```js
const mp3File = e.target.files[0];
const chunkDuration = 5; // seconds
const chunks = await mp3Slice(mp3File, chunkDuration);
```
