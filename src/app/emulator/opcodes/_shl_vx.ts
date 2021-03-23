import { IRegisters } from "../../registers";

// TODO: move to own bit config
const firstBit = 0b10000000; // 0x80 in hex;

// shifting bits is like dividing by 2
export default (registers: IRegisters, source: number) => {
	registers.setV(0x0f, registers.getV(source) & firstBit ? 1 : 0);
	registers.setV(source, registers.getV(source) << 1);
};
