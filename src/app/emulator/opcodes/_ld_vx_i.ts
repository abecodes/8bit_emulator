import { IMemory } from "../../memory";
import { IRegisters } from "../../registers";

export default (registers: IRegisters, memory: IMemory, address: number) => {
	for (let i = 0; i <= address; ++i) {
		registers.setV(i, memory.get(registers.getI() + i));
	}
};
