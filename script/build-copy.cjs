const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(__dirname, "..");
const distDir = path.join(projectDir, "dist");
const buildDir = path.join(projectDir, "target", "wasm32-unknown-emscripten", "release");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(path.join(buildDir, "fib-wasm.js"), path.join(distDir, "fib-wasm.js"));
fs.copyFileSync(path.join(buildDir, "fib_wasm.wasm"), path.join(distDir, "fib_wasm.wasm"));
