const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(__dirname, "..");
const distDir = path.join(projectDir, "dist");
const nodeBuildDir = path.join(projectDir, "target", "wasm32-unknown-emscripten", "release");
const webBuildDir = path.join(projectDir, "target", "web", "wasm32-unknown-emscripten", "release");
const webDistDir = path.join(distDir, "web");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(webDistDir, { recursive: true });
fs.copyFileSync(path.join(nodeBuildDir, "fib-wasm.js"), path.join(distDir, "fib-wasm.js"));
fs.copyFileSync(path.join(nodeBuildDir, "fib_wasm.wasm"), path.join(distDir, "fib_wasm.wasm"));
fs.copyFileSync(path.join(webBuildDir, "fib-wasm.js"), path.join(webDistDir, "fib-wasm.mjs"));
fs.copyFileSync(path.join(webBuildDir, "fib_wasm.wasm"), path.join(webDistDir, "fib_wasm.wasm"));
