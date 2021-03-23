export default (address: number, lowest: number, highest: number) => {
	if (address >= lowest && address <= highest) return true;

	throw new Error(
		`setting PC to address ${address}, lowest: ${lowest}, highest: ${highest}`
	);
};
