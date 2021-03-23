export default (address: number, size: number) => {
	if (address >= 0 && address < size) return true;

	throw new Error(`Error accessing memory address ${address}`);
};
