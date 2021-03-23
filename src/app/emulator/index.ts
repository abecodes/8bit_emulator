import loadRom from "./_loadRom";
import execute from "./_execute";

import Memory from "../memory";
import Registers from "../registers";
import Disassembler from "../disassembler";
import Display from "../display";
import Keyboard from "../keyboard";

import { IEmulatorState } from "../../../shared/emulator";

import ADDRESSES from "../../../conf/_addresses";
import CHARSET from "../../../conf/_charset";
import DISPLAY from "../../../conf/_display";

// TODO: Move into d.ts file
export interface IEmulator {
	boot: () => void;
	loadRom: (pathToRom: string) => Promise<void>;
	start: () => void;
	restart: () => void;
	stop: () => void;
	step: () => void;
	clearFrame: () => void;
	getState: () => IEmulatorState;
	handleKeydown: (e: KeyboardEvent) => void;
	handleKeyup: (e: KeyboardEvent) => void;
}

export default (): IEmulator => {
	const memory = Memory(ADDRESSES.ram_end);
	const registers = Registers();
	const disassembler = Disassembler();
	const display = Display(DISPLAY.width, DISPLAY.height);
	const keyboard = Keyboard();

	let canExecute = true;
	let interval: NodeJS.Timeout;

	const _execute = () => {
		registers.decreaseDelay();
		registers.decreaseSound();
		if (canExecute) {
			execute(
				disassembler.disassemble(memory.getOpcode(registers.getPC())),
				display,
				registers,
				memory,
				keyboard,
				() => (canExecute = false),
				() => (canExecute = true)
			);
		}
	};

	return {
		boot: () => {
			memory.setRange(ADDRESSES.char_set, CHARSET.lowRes);
			registers.setSound(5);
		},
		loadRom: (pathToRom: string) => {
			memory.reset();
			memory.setRange(ADDRESSES.char_set, CHARSET.lowRes);
			canExecute = true;
			return loadRom(pathToRom, memory, registers);
		},
		start: () => (interval = setInterval(_execute, 2)),
		restart: () => {
			canExecute = true;
			display.reset();
			registers.reset();
			keyboard.reset();
		},
		stop: () => {
			clearInterval(interval);
			registers.reset();
			display.reset();
			keyboard.reset();
		},
		step: () => {
			registers.decreaseDelay();
			registers.decreaseSound();
			if (canExecute) {
				execute(
					disassembler.disassemble(memory.getOpcode(registers.getPC())),
					display,
					registers,
					memory,
					keyboard,
					() => (canExecute = false),
					() => (canExecute = true)
				);
			}
		},
		clearFrame: () => display.reset(),
		getState: (): IEmulatorState => {
			return {
				frame: display.getFrame(),
				sound: registers.getSound(),
			};
		},
		handleKeydown: (e: KeyboardEvent) => keyboard.handleKeydown(e),
		handleKeyup: (e: KeyboardEvent) => keyboard.handleKeyup(e),
	};
};
