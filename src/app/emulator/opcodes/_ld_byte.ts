import { IRegisters } from "../../registers";

export default (registers: IRegisters, address: number, value: number) => {
	registers.setV(address, value);
};
