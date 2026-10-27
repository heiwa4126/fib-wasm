# Development

[User guide](./README.md) · [日本語 README](./README_ja.md) · [日本語の開発ガイド](./Develop_ja.md)

## Prerequisites

- Node.js and pnpm
- Rust stable with the `wasm32-unknown-emscripten` target
- Emscripten SDK (`emcc`)

## Set up Emscripten

The following commands install and activate the latest Emscripten SDK in a POSIX shell:

```sh
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
emcc --version
```

The environment setup applies to the current shell. To load it automatically in Bash, add the following to `~/.bashrc`, adjusting the path to your emsdk checkout:

```sh
export EMSDK_QUIET=1
source "/path/to/emsdk/emsdk_env.sh"
```

Add the Rust target and verify that it is installed:

```sh
rustup target add wasm32-unknown-emscripten
rustup target list --installed
```

See the [Rust platform documentation](https://doc.rust-lang.org/beta/rustc/platform-support/wasm32-unknown-emscripten.html) for details about this target.

## Install and build

```sh
pnpm install --frozen-lockfile
pnpm build
```

The build produces two WebAssembly variants under `dist/`:

- `dist/fib-wasm.js` and `dist/fib_wasm.wasm` for Node.js
- `dist/web/fib-wasm.mjs` and `dist/web/fib_wasm.wasm` for browsers

These files are included in the published package. The Node.js and browser entry points are selected by the package exports in `package.json`.

## Test and format

```sh
pnpm test
pnpm smoke-test
pnpm format
```

`pnpm test` runs the Rust and Node.js tests; the Node.js test script builds the package first. `pnpm smoke-test` runs the CommonJS, ESM, and TypeScript examples and expects a completed build. `pnpm format` formats Rust and the other supported files.

`pnpm prepublishOnly` runs the test suite and smoke tests before publishing. `pnpm pack` also builds the package through its `prepack` lifecycle script.

## Publish

The [publish workflow](./.github/workflows/publish.yml) runs when a version tag such as `v1.2.3` or `v1.2.3-rc.1` is pushed by the repository owner. Keep the tag version in sync with `package.json`. The workflow scans the pnpm and Cargo lockfiles, sets up Rust and Emscripten, then publishes to npm. Stable releases use the `latest` dist-tag; prereleases use `dev`.

Before publishing, configure the GitHub Actions environment named `npmjs` and set up npm Trusted Publishing for this repository, the `publish.yml` workflow, and the `npmjs` environment. No npm publishing token is needed by the workflow.

For a local pre-publish check, use an environment with Rust and Emscripten installed:

```sh
pnpm install --frozen-lockfile
pnpm prepublishOnly
```

## License

MIT. See [LICENSE](./LICENSE).
