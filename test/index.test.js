const assert = require("node:assert/strict");
const test = require("node:test");

const { fib } = require("../index.js");

test("fib returns Fibonacci numbers", async () => {
	assert.equal(await fib(0), 0);
	assert.equal(await fib(1), 1);
	assert.equal(await fib(10), 55);
	assert.equal(await fib(78), 8_944_394_323_791_464);
});

test("fib rejects non-integer inputs", async () => {
	await assert.rejects(fib(1.5), {
		name: "TypeError",
		message: "n must be an integer"
	});
	await assert.rejects(fib(NaN), TypeError);
});

test("fib rejects inputs outside the supported range", async () => {
	await assert.rejects(fib(-1), {
		name: "RangeError",
		message: "n must be between 0 and 78"
	});
	await assert.rejects(fib(79), RangeError);
});
