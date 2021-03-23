import * as events from "events";
import { amount } from "../../../conf/_keys";
import _handleKeydown from "./_handleKeydown";
import _handleKeyup from "./_handleKeyup";

class KeyboardEventEmitter extends events.EventEmitter {}

type IKeyboardEvent = "keydown" | "keyup";

// TODO: Move into d.ts file
export interface IKeyboard {
	reset: () => void;
	handleKeydown: ({ key }: KeyboardEvent) => void;
	handleKeyup: ({ key }: KeyboardEvent) => void;
	doesKeyEquals: (index: number) => boolean;
	isKeyPressed: () => number;
	once: (event: IKeyboardEvent, listener: (key: number) => void) => void;
}

export default (): IKeyboard => {
	const emitter = new KeyboardEventEmitter();
	let pressedKeys = new Array(amount).fill(false);

	return {
		reset: () => (pressedKeys = new Array(amount).fill(false)),
		handleKeydown: ({ key }: KeyboardEvent) =>
			emitter.emit("keydown", _handleKeydown(key, pressedKeys)),
		handleKeyup: ({ key }: KeyboardEvent) =>
			emitter.emit("keyup", _handleKeyup(key, pressedKeys)),
		doesKeyEquals: (index: number) => pressedKeys[index],
		isKeyPressed: () => pressedKeys.findIndex((key) => key),
		once: (event: IKeyboardEvent, listener: (key: number) => void) =>
			emitter.once(event, listener),
	};
};
