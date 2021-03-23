import { readFile } from "fs";
import { IMemory } from "../memory";
import { IRegisters } from "../registers";

import ADDRESSES from "../../../conf/_addresses";

export default (
	pathToRom: string,
	memory: IMemory,
	register: IRegisters
): Promise<void> =>
	new Promise((resolve, reject) => {
		readFile(pathToRom, (err, buffer) => {
			if (err) return reject(err);

			memory.setRange(ADDRESSES.load_program, buffer);
			register.setPC(ADDRESSES.load_program);
			resolve(null);
		});
	});
