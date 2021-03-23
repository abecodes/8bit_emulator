import { h } from "preact";
import { useEffect, useRef } from "react";

import COLORS from "../../../conf/_colors";

interface IProps {
	width: number;
	height: number;
	multiply: number;
	frame: number[][];
}

export default ({ width, height, multiply, frame }: IProps) => {
	const cRef = useRef<HTMLCanvasElement>();

	useEffect(() => {
		if ((!cRef || !cRef.current) && frame.length) return;
		cRef.current.height = height * multiply;
		cRef.current.width = width * multiply;
		frame.map((row, y) => row.map((column, x) => _drawPixels(x, y, row[x])));
	}, [cRef, frame]);

	const _drawPixels = (x: number, y: number, color: number) => {
		cRef.current.getContext("2d").fillStyle = color
			? COLORS.foreground
			: COLORS.background;
		cRef.current
			.getContext("2d")
			.fillRect(x * multiply, y * multiply, multiply, multiply);
	};

	return <canvas ref={cRef} />;
};
