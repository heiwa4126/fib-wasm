# @heiwa4126/fib-wasm

[![npm version](https://img.shields.io/npm/v/%40heiwa4126%2Ffib-wasm)](https://www.npmjs.com/package/@heiwa4126/fib-wasm)
[![MIT license](https://img.shields.io/npm/l/%40heiwa4126%2Ffib-wasm)](https://opensource.org/licenses/MIT)

Rust で実装し、WebAssembly にコンパイルした Node.js/ブラウザー向けのフィボナッチ数ライブラリーです。

[English README](./README.md) · [開発ガイド](./Develop.md)

## インストール

```sh
npm install @heiwa4126/fib-wasm
```

## 使い方

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

型宣言はパッケージに含まれています。

```ts
import { fib } from "@heiwa4126/fib-wasm";

const result: number = await fib(10);
console.log(result); // 55
```

### ブラウザー

Vite など、WebAssembly アセットの読み込みに対応したバンドラーで利用できます。

```js
import { fib } from "@heiwa4126/fib-wasm";

document.querySelector("#result").textContent = String(await fib(10));
```

ブラウザー向けの export は WebAssembly を非同期で読み込みます。アプリは`http://`または`https://`で配信してください。`file://`で直接開く方法には対応していません。

## API

```ts
function fib(n: number): Promise<number>;
```

- `n`は`0`以上`78`以下の整数です。
- 整数以外を渡すと`TypeError`で reject します。
- 対応範囲外の整数を渡すと`RangeError`で reject します。

## ライセンス

[MIT](./LICENSE)
