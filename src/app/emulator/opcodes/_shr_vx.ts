import { IRegisters } from "../../registers";

// TODO: move to own bit config
const lastBit = 0b00000001; // 0x01 in hex;

// shifting bits is like dividing by 2
export default (registers: IRegisters, source: number) => {
	// only odd numbers have a last bit = 1
	registers.setV(0x0f, registers.getV(source) & lastBit);
	registers.setV(source, registers.getV(source) >> 1);
};
