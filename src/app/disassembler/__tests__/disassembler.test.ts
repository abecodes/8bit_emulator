import * as mocha from "mocha";
import chai, { expect } from "chai";
import assertArrays from "chai-arrays";
import Disassembler from "../index";

chai.use(assertArrays);

const cases = [
	{
		desc: "Disassemble should not map 0x0000",
		code: 0x0000,
		expect: null,
	},
	{
		desc: "Disassemble should map 0x00e0 to CLS",
		code: 0x00e0,
		expect: "CLS",
	},
	{
		desc: "Disassemble should map 0x00ee to RET",
		code: 0x00ee,
		expect: "RET",
	},
	{
		desc: "Disassemble should map 0x1234 to JP_addr",
		code: 0x1234,
		expect: "JP_addr",
		arguments: [0x234],
	},
	{
		desc: "Disassemble should map 0x2345 to CALL_addr",
		code: 0x2345,
		expect: "CALL_addr",
		arguments: [0x345],
	},
	{
		desc: "Disassemble should map 0x3f09 to SE_VX_BYTE",
		code: 0x3f09,
		expect: "SE_VX_BYTE",
		arguments: [15, 9],
	},
	{
		desc: "Disassemble should map 0x4f09 to SNE_VX_BYTE",
		code: 0x4f09,
		expect: "SNE_VX_BYTE",
		arguments: [15, 9],
	},
	{
		desc: "Disassemble should map 0x5f90 to SE_VX_VY",
		code: 0x5f90,
		expect: "SE_VX_VY",
		arguments: [15, 9],
	},
	{
		desc: "Disassemble should map 0x6a09 to LD_BYTE",
		code: 0x6a09,
		expect: "LD_BYTE",
		arguments: [10, 9],
	},
	{
		desc: "Disassemble should map 0x7a09 to ADD_BYTE",
		code: 0x7a09,
		expect: "ADD_BYTE",
		arguments: [10, 9],
	},
	{
		desc: "Disassemble should map 0x8a00 to LD_VX_VY",
		code: 0x8a00,
		expect: "LD_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a01 to OR_VX_VY",
		code: 0x8a01,
		expect: "OR_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a02 to AND_VX_VY",
		code: 0x8a02,
		expect: "AND_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a03 to XOR_VX_VY",
		code: 0x8a03,
		expect: "XOR_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a04 to ADD_VX_VY",
		code: 0x8a04,
		expect: "ADD_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a05 to SUB_VX_VY",
		code: 0x8a05,
		expect: "SUB_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a06 to SHR_VX_VY",
		code: 0x8a06,
		expect: "SHR_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a07 to SUBN_VX_VY",
		code: 0x8a07,
		expect: "SUBN_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x8a0e to SHL_VX_VY",
		code: 0x8a0e,
		expect: "SHL_VX_VY",
		arguments: [10, 0],
	},
	{
		desc: "Disassemble should map 0x9000 to SNE_VX_VY",
		code: 0x9000,
		expect: "SNE_VX_VY",
		arguments: [0, 0],
	},
	{
		desc: "Disassemble should map 0xa123 to LD_I",
		code: 0xa123,
		expect: "LD_I",
		arguments: [0x123],
	},
	{
		desc: "Disassemble should map 0xb123 to JP_V0",
		code: 0xb123,
		expect: "JP_V0",
		target: 0x123,
		arguments: [0x123],
	},
	{
		desc: "Disassemble should map 0xc123 to RND_BYTE",
		code: 0xc123,
		expect: "RND_BYTE",
		arguments: [1, 0x23],
	},
	{
		desc: "Disassemble should map 0xd123 to DRW_VX_VY_NIBBLE",
		code: 0xd123,
		expect: "DRW_VX_VY_NIBBLE",
		arguments: [1, 2, 3],
	},
	{
		desc: "Disassemble should map 0xe19e to SKP_VX",
		code: 0xe19e,
		expect: "SKP_VX",
		arguments: [1],
	},
	{
		desc: "Disassemble should map 0xe1a1 to SKNP_VX",
		code: 0xe1a1,
		expect: "SKNP_VX",
		arguments: [1],
	},
	{
		desc: "Disassemble should map 0xf507 to LD_VX_DT",
		code: 0xf507,
		expect: "LD_VX_DT",
		arguments: [5],
	},
	{
		desc: "Disassemble should map 0xf50A to LD_VX_BYTE",
		code: 0xf50a,
		expect: "LD_VX_BYTE",
		arguments: [5],
	},
	{
		desc: "Disassemble should map 0xf515 to LD_DT_VX",
		code: 0xf515,
		expect: "LD_DT_VX",
		arguments: [5],
	},
	{
		desc: "Disassemble should map 0xf518 to LD_ST_VX",
		code: 0xf518,
		expect: "LD_ST_VX",
		arguments: [5],
	},
	{
		desc: "Disassemble should map 0xf51e to ADD_I_VX",
		code: 0xf51e,
		expect: "ADD_I_VX",
		arguments: [5],
	},
	{
		desc: "Disassemble should map 0xf529 to LD_F_VX",
		code: 0xf529,
		expect: "LD_F_VX",
		arguments: [5],
	},
	{
		desc: "Disassemble should map 0xf533 to LD_B_VX",
		code: 0xf533,
		expect: "LD_B_VX",
		arguments: [5],
	},

	{
		desc: "Disassemble should map 0xf555 to LD_I_VX",
		code: 0xf555,
		expect: "LD_I_VX",
		arguments: [5],
	},

	{
		desc: "Disassemble should map 0xf565 to LD_VX_I",
		code: 0xf565,
		expect: "LD_VX_I",
		arguments: [5],
	},
];
const d = Disassembler();

describe("Disassembler Test", () => {
	cases.map((c) =>
		it(c.desc, () => {
			expect(d.disassemble(c.code).id).to.equal(c.expect);
			if (c.arguments) {
				expect(d.disassemble(c.code).args).to.equalTo(c.arguments);
			}
		})
	);
});
