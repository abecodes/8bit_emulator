import { IRegisters } from "../../registers";

export default (registers: IRegisters, address: number, value: number) =>
	registers.setV(address, Math.floor(Math.random() * 0xff) & value);
