import { IInstruction } from "../disassembler";
import { IDisplay } from "../display";
import { IKeyboard } from "../keyboard";
import { IMemory } from "../memory";
import { IRegisters } from "../registers";
import opcodes from "./opcodes";

export default (
	instruction: IInstruction,
	display: IDisplay,
	registers: IRegisters,
	memory: IMemory,
	keyboard: IKeyboard,
	pauseExecution: () => void,
	continueExecution: () => void
) => {
	const { id, args } = instruction;

	switch (id) {
		case "CLS":
			opcodes.cls(display);
			registers.setPC(registers.getPC() + 2);
			break;
		case "RET":
			opcodes.ret(registers);
			break;
		case "JP_addr":
			opcodes.jp(registers, args[0]);
			break;
		case "CALL_addr":
			opcodes.call(registers, args[0]);
			break;
		case "SE_VX_BYTE":
			opcodes.se_vx_byte(registers, args[0], args[1]);
			break;
		case "SNE_VX_BYTE":
			opcodes.sne_vx_byte(registers, args[0], args[1]);
			break;
		case "SE_VX_VY":
			opcodes.se_vx_vy(registers, args[0], args[1]);
			break;
		case "LD_BYTE":
			opcodes.ld_byte(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "ADD_BYTE":
			opcodes.add_byte(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_VX_VY":
			opcodes.ld_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "OR_VX_VY":
			opcodes.or_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "AND_VX_VY":
			opcodes.and_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "XOR_VX_VY":
			opcodes.xor_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "ADD_VX_VY":
			opcodes.add_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "SUB_VX_VY":
			opcodes.sub_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "SHR_VX_VY":
			opcodes.shr_vx(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "SUBN_VX_VY":
			opcodes.subn_vx_vy(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "SHL_VX_VY":
			opcodes.shl_vx(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "SNE_VX_VY":
			opcodes.sne_vx_vy(registers, args[0], args[1]);
			break;
		case "LD_I":
			opcodes.ld_i(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "JP_V0":
			opcodes.jp_v0(registers, args[0]);
			break;
		case "RND_BYTE":
			opcodes.rnd_byte(registers, args[0], args[1]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "DRW_VX_VY_NIBBLE":
			opcodes.drw_vx_vy_nibble(
				registers,
				display,
				memory,
				args[0],
				args[1],
				args[2]
			);
			registers.setPC(registers.getPC() + 2);
			break;
		case "SKP_VX":
			opcodes.skp_vx(registers, keyboard, args[0]);
			break;
		case "SKNP_VX":
			opcodes.sknp_vx(registers, keyboard, args[0]);
			break;
		case "LD_VX_DT":
			opcodes.ld_vx_dt(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_VX_BYTE":
			opcodes.ld_vx_byte(
				registers,
				keyboard,
				pauseExecution,
				continueExecution,
				args[0]
			);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_DT_VX":
			opcodes.ld_dt_vx(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_ST_VX":
			opcodes.ld_st_vx(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "ADD_I_VX":
			opcodes.add_i_vx(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_F_VX":
			opcodes.ld_f_vx(registers, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_B_VX":
			opcodes.ld_b_vx(registers, memory, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_I_VX":
			opcodes.ld_i_vx(registers, memory, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		case "LD_VX_I":
			opcodes.ld_vx_i(registers, memory, args[0]);
			registers.setPC(registers.getPC() + 2);
			break;
		default:
			console.error(`no opcode handler for ${id}`);
	}
};
