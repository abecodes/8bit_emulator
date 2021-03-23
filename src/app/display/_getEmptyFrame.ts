export default (width: number, height: number) => {
	const newFrame: number[][] = [];
	for (let i = 0; i < height; ++i) {
		newFrame.push([]);
		for (let j = 0; j < width; ++j) {
			newFrame[i].push(0);
		}
	}

	return newFrame;
};
