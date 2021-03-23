import { IRegisters } from "../../registers";

export default (registers: IRegisters, source: number, target: number) =>
	registers.setV(source, registers.getV(source) ^ registers.getV(target));
