import { keymap } from "../../../conf/_keys";

export default (key: string, pressedKeys: boolean[]) => {
	const index = keymap.findIndex((k: string) => key.toLowerCase() === k);
	if (index > -1) {
		pressedKeys[index] = true;
	}

	return index;
};
