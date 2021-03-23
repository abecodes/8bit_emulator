import { h, render } from "preact";
import IPC from "./layers/ipc";
import Game from "./views/game";
import Soundcard from "./services/sound";

import "./assets/scss/main.scss";

const soundcard = Soundcard();

const App = () => {
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Game soundcard={soundcard} />
		</div>
	);
};

render(<App />, document.body);

const handleKeydown = (event: KeyboardEvent) =>
	IPC.send("keydown", { key: event.key });
const handleKeyup = (event: KeyboardEvent) =>
	IPC.send("keyup", { key: event.key });

document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyup);
