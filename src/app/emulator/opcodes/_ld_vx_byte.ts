import { IKeyboard } from "../../keyboard";
import { IRegisters } from "../../registers";

export default (
	registers: IRegisters,
	keyboard: IKeyboard,
	pauseExecution: () => void,
	continueExecution: () => void,
	address: number
) => {
	pauseExecution();
	keyboard.once("keydown", (key) => {
		registers.setV(address, key);
		continueExecution();
	});
};
