import { IRegisters } from "../../registers";

export default (registers: IRegisters, address: number) => {
	registers.setSound(registers.getV(address));
};
