import AUDIO from "../../../conf/_audio";

export interface ISoundcard {
	isEnabled: () => boolean;
	enable: () => void;
	disable: () => void;
	increase: () => void;
	decrease: () => void;
}

export default (): ISoundcard => {
	let isEnabled = false;
	const audio = window.AudioContext ? new window.AudioContext() : undefined;
	const volume = audio ? new window.GainNode(audio) : undefined;
	const oscillator = volume
		? new window.OscillatorNode(audio, { type: "square" })
		: undefined;

	if (volume) {
		volume.gain.value = 0;
		volume.connect(audio.destination);
	}

	if (oscillator) {
		oscillator.connect(volume);
		oscillator.start();
	}

	return {
		isEnabled: () => isEnabled,
		enable: () => {
			if (isEnabled) return;

			isEnabled = true;
			// if (oscillator) oscillator.start();
			if (oscillator) volume.gain.value = AUDIO.volume;
		},
		disable: () => {
			if (!isEnabled) return;

			isEnabled = false;
			// if (oscillator) oscillator.stop();
			if (oscillator) volume.gain.value = 0;
		},
		increase: () =>
			volume.gain.value < 1
				? (volume.gain.value = volume.gain.value + 0.1)
				: null,
		decrease: () =>
			volume.gain.value > 0
				? (volume.gain.value = volume.gain.value - 0.1)
				: null,
	};
};
