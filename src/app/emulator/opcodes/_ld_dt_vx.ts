import { IRegisters } from "../../registers";

export default (registers: IRegisters, address: number) => {
	registers.setDelay(registers.getV(address));
};
