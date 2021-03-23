import { IRegisters } from "../../registers";

export default (registers: IRegisters, value: number) =>
	registers.setPC(registers.getV(0) + value);
