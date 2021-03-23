/**
 * Masks
 *
 * 0xffff - match the pattern exactly
 * 0xf000 - match pattern to the first bit
 * 0x0fff - match patters last three bits
 */

const POS_NNNN = 0xffff;
const POS_XNNN = 0x0fff;
const POS_XXNN = 0x00ff;
const POS_NXXX = 0xf000;
const POS_XNXX = 0x0f00;
const POS_XXNX = 0x00f0;
const POS_XXXN = 0x000f;
const POS_NXXN = 0xf00f;
const POS_NXNN = 0xf0ff;

const MASK_XNNN = {
	mask: POS_XNNN,
	shift: null,
};
const MASK_XXNN = {
	mask: POS_XXNN,
	shift: null,
};
const MASK_XXXN = {
	mask: POS_XXXN,
	shift: null,
};
const MASK_XNXX = {
	mask: POS_XNXX,
	shift: 8,
};
const MASK_XXNX = {
	mask: POS_XXNX,
	shift: 4,
};

module.exports = {
	chip8: [
		{
			key: 1,
			id: "CLS",
			name: "CLS",
			match: POS_NNNN,
			pattern: 0x00e0,
			arguments: null,
		},
		{
			key: 2,
			id: "RET",
			name: "RET",
			match: POS_NNNN,
			pattern: 0x00ee,
			arguments: null,
		},
		{
			key: 3,
			id: "JP_addr",
			name: "JP",
			match: POS_NXXX,
			pattern: 0x1000,
			arguments: [MASK_XNNN],
		},
		{
			key: 4,
			id: "CALL_addr",
			name: "CALL",
			match: POS_NXXX,
			pattern: 0x2000,
			arguments: [MASK_XNNN],
		},
		{
			key: 5,
			id: "SE_VX_BYTE",
			name: "SE_BYTE",
			match: POS_NXXX,
			pattern: 0x3000,
			arguments: [MASK_XNXX, MASK_XXNN],
		},
		{
			key: 6,
			id: "SNE_VX_BYTE",
			name: "SNE_BYTE",
			match: POS_NXXX,
			pattern: 0x4000,
			arguments: [MASK_XNXX, MASK_XXNN],
		},
		{
			key: 7,
			id: "SE_VX_VY",
			name: "SE_VY",
			match: POS_NXXN,
			pattern: 0x5000,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 8,
			id: "LD_BYTE",
			name: "LD_BYTE",
			match: POS_NXXX,
			pattern: 0x6000,
			arguments: [MASK_XNXX, MASK_XXNN],
		},
		{
			key: 9,
			id: "ADD_BYTE",
			name: "ADD_BYTE",
			match: POS_NXXX,
			pattern: 0x7000,
			arguments: [MASK_XNXX, MASK_XXNN],
		},
		{
			key: 10,
			id: "LD_VX_VY",
			name: "LD_VX_VY",
			match: POS_NXXN,
			pattern: 0x8000,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 11,
			id: "OR_VX_VY",
			name: "OR_VX_VY",
			match: POS_NXXN,
			pattern: 0x8001,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 12,
			id: "AND_VX_VY",
			name: "AND_VX_VY",
			match: POS_NXXN,
			pattern: 0x8002,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 13,
			id: "XOR_VX_VY",
			name: "XOR_VX_VY",
			match: POS_NXXN,
			pattern: 0x8003,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 14,
			id: "ADD_VX_VY",
			name: "ADD_VX_VY",
			match: POS_NXXN,
			pattern: 0x8004,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 15,
			id: "SUB_VX_VY",
			name: "SUB_VX_VY",
			match: POS_NXXN,
			pattern: 0x8005,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 16,
			id: "SHR_VX_VY",
			name: "SHR_VX_VY",
			match: POS_NXXN,
			pattern: 0x8006,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 17,
			id: "SUBN_VX_VY",
			name: "SUBN_VX_VY",
			match: POS_NXXN,
			pattern: 0x8007,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 18,
			id: "SHL_VX_VY",
			name: "SHL_VX_VY",
			match: POS_NXXN,
			pattern: 0x800e,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 19,
			id: "SNE_VX_VY",
			name: "SNE_VX_VY",
			match: POS_NXXN,
			pattern: 0x9000,
			arguments: [MASK_XNXX, MASK_XXNX],
		},
		{
			key: 20,
			id: "LD_I",
			name: "LD_I",
			match: POS_NXXX,
			pattern: 0xa000,
			arguments: [MASK_XNNN],
		},
		{
			key: 21,
			id: "JP_V0",
			name: "JP_V0",
			match: POS_NXXX,
			pattern: 0xb000,
			arguments: [MASK_XNNN],
		},
		{
			key: 22,
			id: "RND_BYTE",
			name: "RND_BYTE",
			match: POS_NXXX,
			pattern: 0xc000,
			arguments: [MASK_XNXX, MASK_XXNN],
		},
		{
			key: 23,
			id: "DRW_VX_VY_NIBBLE",
			name: "DRW_VX_VY_NIBBLE",
			match: POS_NXXX,
			pattern: 0xd000,
			arguments: [MASK_XNXX, MASK_XXNX, MASK_XXXN],
		},
		{
			key: 24,
			id: "SKP_VX",
			name: "SKP_VX",
			match: POS_NXNN,
			pattern: 0xe09e,
			arguments: [MASK_XNXX],
		},
		{
			key: 25,
			id: "SKNP_VX",
			name: "SKNP_VX",
			match: POS_NXNN,
			pattern: 0xe0a1,
			arguments: [MASK_XNXX],
		},
		{
			key: 26,
			id: "LD_VX_DT",
			name: "LD_VX_DT",
			match: POS_NXNN,
			pattern: 0xf007,
			arguments: [MASK_XNXX],
		},
		{
			key: 27,
			id: "LD_VX_BYTE",
			name: "LD_VX_BYTE",
			match: POS_NXNN,
			pattern: 0xf00a,
			arguments: [MASK_XNXX],
		},
		{
			key: 28,
			id: "LD_DT_VX",
			name: "LD_DT_VX",
			match: POS_NXNN,
			pattern: 0xf015,
			arguments: [MASK_XNXX],
		},
		{
			key: 29,
			id: "LD_ST_VX",
			name: "LD_ST_VX",
			match: POS_NXNN,
			pattern: 0xf018,
			arguments: [MASK_XNXX],
		},
		{
			key: 30,
			id: "ADD_I_VX",
			name: "ADD_I_VX",
			match: POS_NXNN,
			pattern: 0xf01e,
			arguments: [MASK_XNXX],
		},
		{
			key: 31,
			id: "LD_F_VX",
			name: "LD_F_VX",
			match: POS_NXNN,
			pattern: 0xf029,
			arguments: [MASK_XNXX],
		},
		{
			key: 32,
			id: "LD_B_VX",
			name: "LD_B_VX",
			match: POS_NXNN,
			pattern: 0xf033,
			arguments: [MASK_XNXX],
		},
		{
			key: 33,
			id: "LD_I_VX",
			name: "LD_I_VX",
			match: POS_NXNN,
			pattern: 0xf055,
			arguments: [MASK_XNXX],
		},
		{
			key: 34,
			id: "LD_VX_I",
			name: "LD_VX_I",
			match: POS_NXNN,
			pattern: 0xf065,
			arguments: [MASK_XNXX],
		},
	],
};
