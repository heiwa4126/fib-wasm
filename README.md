# fib-wasm (@heiwa4126/fib-wasm)

Rust でフィボナッチ関数を書いて、wasm としてビルドしたものを、npm パッケージにする。

## サンプル

依存関係をインストールし、`pnpm build` でビルドした後に実行する。いずれも `55` を表示する。

- [CommonJS](./example/fib.cjs): `node example/fib.cjs`
- [ES Modules](./example/fib.mjs): `node example/fib.mjs`
- [TypeScript](./example/fib.ts): `node example/fib.ts`（TypeScript を直接実行できる Node.js が必要）

[example/package.json](./example/package.json) の `"type": "module"` により、TypeScript サンプルを ESM として明示する。`.cjs` は引き続き CommonJS として実行される。

3種類をまとめて実行するスモークテスト: `pnpm smoke-test`（ビルド済みであること）。
