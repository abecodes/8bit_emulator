import { IRegisters } from "../../registers";

import CHARSET from "../../../../conf/_charset";
import { IMemory } from "../../memory";

export default (registers: IRegisters, memory: IMemory, address: number) => {
	let x = registers.getV(address);

	const hundreds = Math.floor(x / 100);
	const tens = Math.floor((x - hundreds * 100) / 10);
	const ones = x - tens * 10 - hundreds * 100;

	memory.set(registers.getI(), hundreds);
	memory.set(registers.getI() + 1, tens);
	memory.set(registers.getI() + 2, ones);
};
