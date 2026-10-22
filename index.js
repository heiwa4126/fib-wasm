const createFibModule = require("./dist/fib-wasm.js");

let modulePromise;

async function getModule() {
	modulePromise ??= createFibModule();
	return modulePromise;
}

async function fib(n) {
	if (!Number.isInteger(n)) {
		throw new TypeError("n must be an integer");
	}

	if (n < 0 || n > 78) {
		throw new RangeError("n must be between 0 and 78");
	}

	const module = await getModule();
	return module._fib(n);
}

module.exports = { fib };
