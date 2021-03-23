import getEmptyFrame from "./_getEmptyFrame";
import { IMemory } from "../memory";
import { IRegisters } from "../registers";

import CHARSET from "../../../conf/_charset";

// TODO: Move into d.ts file
export interface IDisplay {
	reset: () => number[][];
	getFrame: () => number[][];
	//drawSprite: (sprite: ISprite) => void;
	drawSprite: (
		memory: IMemory,
		register: IRegisters,
		x: number,
		y: number,
		z: number
	) => boolean;
}

export default (width: number, height: number): IDisplay => {
	let frame: number[][] = getEmptyFrame(width, height);

	return {
		reset: () => (frame = getEmptyFrame(width, height)),
		getFrame: () => frame,
		drawSprite: (
			memory: IMemory,
			register: IRegisters,
			xValue: number,
			yValue: number,
			zValue: number
		) => {
			let hasColision = false;
			for (let y = 0; y < zValue; y++) {
				let line = memory.get(register.getI() + y);
				for (let x = 0; x < CHARSET.width; x++) {
					// let value = line & (1 << (7 - position)) ? 1 : 0;
					const value = line & (CHARSET.controlBit >> x);
					let posX = (register.getV(xValue) + x) % 64; // wrap width
					let posY = (register.getV(yValue) + y) % 32; // wrap height

					frame[posY][posX] && (hasColision = true);
					frame[posY][posX] ^= value;
				}
			}

			return hasColision;
		},
	};
};
