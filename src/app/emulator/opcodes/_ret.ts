import { IRegisters } from "../../registers";

export default (registers: IRegisters) =>
	registers.setPC(registers.popFromStack());
