import { IKeyboard } from "../../keyboard";
import { IRegisters } from "../../registers";

export default (registers: IRegisters, keyboard: IKeyboard, source: number) => {
	if (!keyboard.doesKeyEquals(registers.getV(source))) {
		registers.setPC(registers.getPC() + 4);
	} else {
		registers.setPC(registers.getPC() + 2);
	}
};
