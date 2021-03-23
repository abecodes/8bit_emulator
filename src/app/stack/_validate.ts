export default (index: number, size: number) => {
	if (index <= -1) throw new Error(`stack underflow for index: ${index}`);
	if (index > size) throw new Error(`stack overflow for index: ${index}`);
	return true;
};
