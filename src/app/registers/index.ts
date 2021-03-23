import REGISTERS from "../../../conf/_registers";
import ADDRESSES from "../../../conf/_addresses";
import Stack from "../stack";
import n from "./_new";
import validateStack from "./_validateStack";
import validatePC from "./_validatePC";

// TODO: Move into d.ts file
export interface IRegisters {
	reset: () => void;
	getSP: () => number;
	getDelay: () => number;
	setDelay: (value: number) => number;
	increaseDelay: () => number;
	decreaseDelay: () => number;
	getSound: () => number;
	setSound: (value: number) => number;
	increaseSound: () => number;
	decreaseSound: () => number;
	pushOntoStack: (value: number) => number;
	popFromStack: () => number;
	setV: (address: number, value: number) => number;
	getV: (address: number) => number;
	setI: (address: number) => number;
	getI: () => number;
	setPC: (address: number) => number;
	getPC: () => number;
	increasePC: () => number;
	stopInterval: () => void;
}

export default (): IRegisters => {
	let v = n(REGISTERS.amount);
	/* Stack is 16 16bit values, Stack pointer is in stack */
	let stack = Stack(REGISTERS.stackSize, "16bit");
	// keeps a memory address, is 16 bit
	let i = 0;
	let delayTimer = 0;
	let soundTimer = 0;
	/* Programm counter (e.g. cursor) */
	let pc = ADDRESSES.load_program;
	let interval = 0;

	return {
		reset: () => {
			v = n(REGISTERS.amount);
			stack.reset();
			i = 0;
			delayTimer = 0;
			soundTimer = 0;
			pc = ADDRESSES.load_program;
		},
		getSP: () => stack.getPointer(),
		getDelay: () => delayTimer,
		setDelay: (value: number) => (delayTimer = value),
		increaseDelay: () => ++delayTimer,
		decreaseDelay: () => (delayTimer ? --delayTimer : null),
		getSound: () => soundTimer,
		setSound: (value: number) => (soundTimer = value),
		increaseSound: () => (soundTimer = soundTimer + 5),
		decreaseSound: () => (soundTimer ? --soundTimer : null),
		pushOntoStack: (value: number) => stack.push(value),
		popFromStack: () => stack.pop(),
		setV: (address: number, value: number) =>
			validateStack(address, REGISTERS.amount) && (v[address] = value),
		getV: (address: number) =>
			validateStack(address, REGISTERS.amount) && v[address],
		// TODO: rename validatePC
		setI: (address: number) => (i = address),
		getI: () => i,
		setPC: (address: number) =>
			validatePC(address, ADDRESSES.load_program, ADDRESSES.ram_end) &&
			(pc = address),
		getPC: () => pc,
		increasePC: () => (pc = pc + 2),
		stopInterval: () => clearInterval(interval),
	};
};
