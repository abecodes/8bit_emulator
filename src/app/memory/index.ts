import n from "./_new";
import validate from "./_validate";

// TODO: Move into d.ts file
export interface IMemory {
	reset: () => void;
	set: (address: number, value: number) => number;
	get: (address: number) => number;
	setRange: (address: number, values: Uint8Array) => void;
	getRange: (from: number, to: number) => Uint8Array;
	getOpcode: (address: number) => number;
}

export default (size: number): IMemory => {
	let memory = n(size);

	return {
		reset: () => (memory = n(size)),
		set: (address: number, value: number) =>
			validate(address, size) && (memory[address] = value),
		get: (address: number) => validate(address, size) && memory[address],
		setRange: (address: number, values: Uint8Array) =>
			validate(address + values.length, size) && memory.set(values, address),
		getRange: (from: number, to: number) =>
			validate(from, size) && validate(to, size) && memory.slice(from, to),
		getOpcode: (address: number) => {
			validate(address, size) && validate(address + 1, size);
			const highByte = memory[address];
			const lowByte = memory[address + 1];

			return (highByte << 8) | lowByte;
		},
	};
};
