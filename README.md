# fib-wasm (@heiwa4126/fib-wasm)

Rust でフィボナッチ関数を書いて、wasm としてビルドしたものを、npm パッケージにする練習。

## サンプル

依存関係をインストールし、`pnpm build`でビルドした後に実行する。いずれも`55`を表示する。

- [CommonJS](./example/fib.cjs): `node example/fib.cjs`
- [ES Modules](./example/fib.mjs): `node example/fib.mjs`
- [TypeScript](./example/fib.ts): `node example/fib.ts`（TypeScript を直接実行できる Node.js が必要）

[example/package.json](./example/package.json) の`"type": "module"`により、TypeScript サンプルを ESM として明示する。`.cjs`は引き続き CommonJS として実行される。

3 種類をまとめて実行するスモークテスト: `pnpm smoke-test`（ビルド済みであること）。

## ブラウザー / React

Vite などのブラウザーバンドラーから利用できる。パッケージの`browser` export が WebAssembly 版を選ぶ。

```jsx
import { useState } from "react";
import { fib } from "@heiwa4126/fib-wasm";

export function Fibonacci() {
	const [result, setResult] = useState();

	async function calculate() {
		setResult(await fib(10));
	}

	return <button onClick={calculate}>{result ?? "Calculate fib(10)"}</button>;
}
```

WebAssembly はバンドラーが bundle に含める（サイズ設定により独立アセットまたは inline）。アプリは`http://`または`https://`で配信する（`file://`では動作しない）。

## npm への公開

[公開ワークフロー](./.github/workflows/publish.yml) は、リポジトリ所有者が`v1.2.3`または`v1.2.3-rc.1`のようなタグを push すると実行される。
OSV で pnpm と Cargo のロックファイルをスキャンした後、Rust stable、`wasm32-unknown-emscripten`ターゲット、Emscripten をセットアップして npm に公開する。
通常リリースの npm dist-tag は`latest`、プリリリースは`dev`。

事前に GitHub の`npmjs` environment と、npm パッケージの Trusted Publisher（このリポジトリ、ワークフロー `publish.yml`、environment `npmjs`）を設定する。
タグのバージョンは`package.json`のバージョンと揃える。

`prepublishOnly`で Rust のテスト、Wasm ビルド、Node.js のテスト、3 種類のスモークテストを実行する。
既存の`prepack`によるビルドも維持するため、`pnpm pack`でも Wasm が生成される。
ローカルでの検証は、Rust と Emscripten（`emcc`）を利用できる環境で`pnpm install --frozen-lockfile`、`pnpm prepublishOnly`を実行する。
