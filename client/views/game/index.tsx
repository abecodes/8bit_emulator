import { h } from "preact";
import { useEffect, useRef, useState } from "react";
import { IEmulatorState } from "../../../shared/emulator";
import { ISoundcard } from "../../services/sound";
import { IpcRendererEvent } from "electron";
import Canvas from "../../components/canvas";

import IPC from "../../layers/ipc";

import DISPLAY from "../../../conf/_display";

interface IProps {
	soundcard: ISoundcard;
}

export default ({ soundcard }: IProps) => {
	const [started, setStarted] = useState<boolean>(false);
	const [stop, setStop] = useState<boolean>(true);
	const [frame, setFrame] = useState<number[][]>([]);
	const [fps, setFps] = useState<number>(0);
	const [fpsInterval, setFpsInterval] = useState<NodeJS.Timeout>();

	const requestRef = useRef<number>();
	const previousTimeRef = useRef<number>();
	const fpsCounter = useRef<number>(0);

	const handleNewGameState = (
		_event: IpcRendererEvent,
		state: IEmulatorState
	) => {
		state.sound ? soundcard.enable() : soundcard.disable();
		setFrame(state.frame);
		requestRef.current = requestAnimationFrame(animate);
	};

	const handleRestart = () => {
		IPC.send("restartRom", null);
	};

	const handleStop = () => {
		IPC.send("unloadRom", null);
	};

	const handleRomLoaded = () => {
		setStarted(true);
		setStop(false);
	};

	const handleRomUnloaded = () => {
		setStop(true);
		setStarted(false);
		fpsCounter.current = 0;
		setFps(0);
	};

	const animate = (time: number) => {
		/* if (previousTimeRef.current) {
			const deltaTime = time - previousTimeRef.current;
			x = (x + deltaTime * 0.01) % 100;
			console.log(deltaTime, deltaTime * 0.01, x);
		} */
		IPC.send("requestGameState", null);
		previousTimeRef.current = time;
		++fpsCounter.current;
	};

	useEffect(() => {
		IPC.addListener("newGameState", handleNewGameState);
		IPC.addListener("romLoaded", handleRomLoaded);
		IPC.addListener("romUnloaded", handleRomUnloaded);

		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
			IPC.removeListener("newGameState", handleNewGameState);
			IPC.removeListener("romLoaded", handleRomLoaded);
			IPC.removeListener("romUnloaded", handleRomUnloaded);
			clearInterval(fpsInterval);
		};
	}, []);

	useEffect(() => {
		if (!started) return;
		IPC.send("boot", null);
		setFpsInterval(
			setInterval(() => {
				setFps(fpsCounter.current);
				fpsCounter.current = 0;
			}, 1000)
		);
		requestRef.current = requestAnimationFrame(animate);
	}, [started]);

	useEffect(() => {
		if (!stop) return;
		clearInterval(fpsInterval);
		cancelAnimationFrame(requestRef.current);
		requestRef.current = 0;
	}, [stop]);

	return (
		<div className="container">
			<div className="game-area">
				<div className="nes-container is-dark with-title">
					<p className="title">Emulator</p>
					{started ? (
						<div className="game-canvas">
							<Canvas
								height={DISPLAY.height}
								width={DISPLAY.width}
								multiply={DISPLAY.multiply}
								frame={frame}
							/>
							<div className="button-bar">
								<button
									type="button"
									className="nes-btn is-primary"
									onClick={handleRestart}
								>
									Restart
								</button>
								<button
									type="button"
									className="nes-btn is-error"
									onClick={handleStop}
								>
									Stop
								</button>
							</div>
						</div>
					) : (
						<p>"No ROM loaded"</p>
					)}
				</div>

				<div className="nes-container is-dark with-title">
					<p className="title">Debug</p>
					<p>FPS: {fps}</p>
				</div>
			</div>

			<p className="footer">
				made with <i className="nes-icon is-small heart"></i>
			</p>
		</div>
	);
};
