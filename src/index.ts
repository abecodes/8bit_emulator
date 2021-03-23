import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
import * as IPC from "./app/layers/ipc";
import Emulator from "./app/emulator";
import Menu from "./_menu";

let mainWindow: BrowserWindow;
const emulator = Emulator();

app.setName("Chip8");

app
	.whenReady()
	.then(() => {
		process.getCPUUsage();
		app.getAppMetrics();
	})
	.then(() => {
		IPC.addListener("boot", emulator.boot);
		IPC.addListener("clearFrame", emulator.clearFrame);
		IPC.addListener("restartRom", emulator.restart);
		IPC.addListener("unloadRom", (e) => {
			emulator.stop();
			e.reply("romUnloaded");
		});
		IPC.addListener("clearFrame", emulator.clearFrame);

		IPC.addListener("keydown", (e, payload) => {
			console.log(payload);
			emulator.handleKeydown(payload);
		});
		IPC.addListener("keyup", (e, payload) => emulator.handleKeyup(payload));

		IPC.addListener("requestGameState", (e, _payload) => {
			e.reply("newGameState", emulator.getState());
		});
	})
	.then(() => {
		const { width, height } = screen.getPrimaryDisplay().workAreaSize;

		mainWindow = new BrowserWindow({
			width: Math.floor(width / 2),
			height: Math.floor(height / 2),
			webPreferences: {
				nodeIntegration: false,
				contextIsolation: true,
				enableRemoteModule: false,
				preload: path.join(app.getAppPath(), "ipcRenderer.js"),
			},
		});

		return mainWindow.loadFile("index.html");
	})
	.then(() => Menu(emulator, mainWindow))
	.then(() => {
		app.on("before-quit", () => {
			return true;
		});
	})
	.catch((err) => {
		console.log("Startup Error:", err);
		process.stderr.write("Could not start app");
		process.exit(1);
	});
