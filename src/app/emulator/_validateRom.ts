import ADDRESSES from "../../../conf/_addresses";

export default (romBuffer: Uint8Array) => {
	if (ADDRESSES.load_program + romBuffer.length <= ADDRESSES.ram_end) {
		return true;
	}
	throw new Error("rom too big");
};
