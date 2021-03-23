import { IDisplay } from "../../display";
import { IRegisters } from "../../registers";

import CHARSET from "../../../../conf/_charset";
import { IMemory } from "../../memory";

export default (
	registers: IRegisters,
	display: IDisplay,
	memory: IMemory,
	source: number,
	target: number,
	nibble: number
) => {
	registers.setV(
		0x0f,
		display.drawSprite(memory, registers, source, target, nibble) ? 1 : 0
	);
};
