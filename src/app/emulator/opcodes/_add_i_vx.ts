import { IRegisters } from "../../registers";

export default (registers: IRegisters, address: number) =>
	registers.setI(registers.getI() + registers.getV(address));
