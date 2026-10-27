# @heiwa4126/fib-wasm

[![npm version](https://img.shields.io/npm/v/%40heiwa4126%2Ffib-wasm)](https://www.npmjs.com/package/@heiwa4126/fib-wasm)
[![MIT license](https://img.shields.io/npm/l/%40heiwa4126%2Ffib-wasm)](https://opensource.org/licenses/MIT)

A small Fibonacci library written in Rust and compiled to WebAssembly for Node.js and browsers.

[日本語版 README](./README_ja.md) · [Development guide](./Develop.md) · [日本語の開発ガイド](./Develop_ja.md)

## Installation

```sh
npm install @heiwa4126/fib-wasm
```

## Usage

### ES modules

```js
import { fib } from "@heiwa4126/fib-wasm";

console.log(await fib(10)); // 55
```

### CommonJS

```js
const { fib } = require("@heiwa4126/fib-wasm");

fib(10).then(console.log); // 55
```

### TypeScript

Type declarations are included with the package.

```ts
import { fib } from "@heiwa4126/fib-wasm";

const result: number = await fib(10);
console.log(result); // 55
```

### Browsers

Use the package from a browser application built with a bundler that supports loading WebAssembly assets, such as Vite:

```js
import { fib } from "@heiwa4126/fib-wasm";

document.querySelector("#result").textContent = String(await fib(10));
```

The browser export loads WebAssembly asynchronously. Serve the application over `http://` or `https://`; opening it directly with `file://` is not supported.

## API

```ts
function fib(n: number): Promise<number>;
```

- `n` must be an integer from `0` through `78`, inclusive.
- A non-integer argument rejects with `TypeError`.
- An integer outside the supported range rejects with `RangeError`.

## License

[MIT](./LICENSE)
