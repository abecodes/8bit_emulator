import { IRegisters } from "../../registers";

import CHARSET from "../../../../conf/_charset";

export default (registers: IRegisters, address: number) => {
	registers.setI(registers.getV(address) * CHARSET.height);
};
