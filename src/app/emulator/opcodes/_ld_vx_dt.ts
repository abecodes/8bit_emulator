import { IRegisters } from "../../registers";

export default (registers: IRegisters, address: number) => {
	registers.setV(address, registers.getDelay());
};
