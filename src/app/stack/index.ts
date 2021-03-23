import validate from "./_validate";

export default (size: number, bit: "8bit" | "16bit") => {
	let stack = bit === "16bit" ? new Uint16Array(size) : new Uint8Array(size);
	let pointer = -1;

	return {
		reset: () => {
			stack = bit === "16bit" ? new Uint16Array(size) : new Uint8Array(size);
			pointer = -1;
		},
		push: (value: number) =>
			validate(pointer + 1, size) && (stack[++pointer] = value),
		pop: () => validate(pointer, size) && stack[pointer--],
		getPointer: () => pointer,
	};
};
