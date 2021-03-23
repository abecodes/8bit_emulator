import { IRegisters } from "../../registers";

export default (registers: IRegisters, source: number, target: number) => {
	registers.setV(0x0f, registers.getV(source) > registers.getV(target) ? 1 : 0);
	// since V is of type UIntArry it will already take the lower bytes on overflow
	// eg.: 256 will be stored as 0, 257 as 1, etc
	registers.setV(source, registers.getV(source) - registers.getV(target));
};
