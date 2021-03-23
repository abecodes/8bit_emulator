import { IRegisters } from "../../registers";

export default (registers: IRegisters, source: number, target: number) => {
	if (registers.getV(source) !== registers.getV(target)) {
		registers.setPC(registers.getPC() + 4);
	} else {
		registers.setPC(registers.getPC() + 2);
	}
};
