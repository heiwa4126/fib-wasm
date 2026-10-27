# 開発ガイド

[English development guide](./Develop.md) · [README](./README_ja.md) · [English README](./README.md)

## 必要な環境

- Node.js と pnpm
- Rust stable と `wasm32-unknown-emscripten` ターゲット
- Emscripten SDK (`emcc`)

## Emscripten のセットアップ

以下は POSIX シェルで Emscripten SDK を取得し、最新バージョンを有効にする手順です。

```sh
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
emcc --version
```

環境設定は現在のシェルに適用されます。Bash の起動時に自動で読み込む場合は、emsdk の配置先に合わせてパスを調整し、`~/.bashrc` に次を追加してください。

```sh
export EMSDK_QUIET=1
source "/path/to/emsdk/emsdk_env.sh"
```

Rust のターゲットを追加し、インストール済みであることを確認します。

```sh
rustup target add wasm32-unknown-emscripten
rustup target list --installed
```

ターゲットの詳細は [Rust のプラットフォームドキュメント](https://doc.rust-lang.org/beta/rustc/platform-support/wasm32-unknown-emscripten.html) を参照してください。

## インストールとビルド

```sh
pnpm install --frozen-lockfile
pnpm build
```

ビルドすると、`dist/` 以下に2種類の WebAssembly 成果物が生成されます。

- Node.js 用: `dist/fib-wasm.js` と `dist/fib_wasm.wasm`
- ブラウザー用: `dist/web/fib-wasm.mjs` と `dist/web/fib_wasm.wasm`

これらは公開パッケージに含まれます。Node.js / ブラウザーのエントリーポイントは `package.json` の exports で選択されます。

## テストとフォーマット

```sh
pnpm test
pnpm smoke-test
pnpm format
```

`pnpm test` は Rust と Node.js のテストを実行します。Node.js のテストは最初にビルドも行います。`pnpm smoke-test` は CommonJS、ESM、TypeScript のサンプルを実行するため、事前にビルドが必要です。`pnpm format` は Rust とその他の対応ファイルをフォーマットします。

`pnpm prepublishOnly` は公開前にテスト一式とスモークテストを実行します。`pnpm pack` も `prepack` ライフサイクルスクリプトを通じてビルドします。

## npm への公開

[公開 workflow](./.github/workflows/publish.yml) は、リポジトリ所有者が `v1.2.3` や `v1.2.3-rc.1` のようなバージョンタグを push すると実行されます。タグのバージョンを `package.json` と揃えてください。workflow は pnpm と Cargo のロックファイルをスキャンし、Rust と Emscripten をセットアップして npm に公開します。通常リリースの dist-tag は `latest`、プレリリースは `dev` です。

公開前に、GitHub Actions の `npmjs` environment と、npm Trusted Publishing（このリポジトリ、`publish.yml` workflow、`npmjs` environment）を設定してください。workflow に npm の公開 token は不要です。

ローカルで公開前の検証をする場合は、Rust と Emscripten を利用できる環境で次を実行します。

```sh
pnpm install --frozen-lockfile
pnpm prepublishOnly
```

## ライセンス

MIT。詳細は [LICENSE](./LICENSE) を参照してください。
