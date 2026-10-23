import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

globalThis.window = {};
globalThis.fetch = async (url) =>
	new Response(await readFile(fileURLToPath(url)), {
		headers: { "content-type": "application/wasm" }
	});

const { fib } = await import("@heiwa4126/fib-wasm");

test("browser export runs the WebAssembly module", async () => {
	assert.equal(await fib(10), 55);
});

test("browser export validates inputs", async () => {
	await assert.rejects(fib(1.5), TypeError);
	await assert.rejects(fib(79), RangeError);
});
