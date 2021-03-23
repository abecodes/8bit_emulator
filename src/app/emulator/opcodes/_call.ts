import { IRegisters } from "../../registers";

export default (registers: IRegisters, value: number) => {
	registers.pushOntoStack(registers.getPC() + 2);
	registers.setPC(value);
};
