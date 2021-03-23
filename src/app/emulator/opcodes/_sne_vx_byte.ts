import { IRegisters } from "../../registers";

export default (registers: IRegisters, source: number, target: number) => {
	if (registers.getV(source) !== target) {
		registers.setPC(registers.getPC() + 4);
	} else {
		registers.setPC(registers.getPC() + 2);
	}
};
