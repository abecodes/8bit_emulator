import INSTRUCTIONS from "../../../conf/_instructions";

// TODO: Move into d.ts file
export interface IDisassembler {
	disassemble: (opcode: number) => IInstruction;
}

export interface IInstruction {
	id: string;
	args: number[];
}

export default (): IDisassembler => {
	let instructions = INSTRUCTIONS.chip8;

	return {
		disassemble: (opcode: number): IInstruction => {
			const i = instructions.find(
				(inst) => (opcode & inst.match) === inst.pattern
			);
			if (i) {
				// ifs are not needed, bitwise ops with null return null
				return {
					id: i.id,
					args: i.arguments
						? i.arguments.reduce((prev, curr) => {
								prev.push((opcode & curr.mask) >> curr.shift);
								return prev;
						  }, [])
						: null,
				};
			}

			return {
				id: null,
				args: null,
			};
		},
	};
};
