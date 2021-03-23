import {
	app,
	BrowserWindow,
	dialog,
	Menu,
	MenuItem,
	MenuItemConstructorOptions,
} from "electron";
import { IEmulator } from "./app/emulator";

const isMac = process.platform === "darwin";

const getTemplate = (emulator: IEmulator, mainWindow: BrowserWindow) => [
	// { role: 'appMenu' }
	...(isMac
		? [
				{
					label: app.name,
					submenu: [
						{ role: "about" },
						{ type: "separator" },
						{ role: "services" },
						{ type: "separator" },
						{ role: "hide" },
						{ role: "hideothers" },
						{ role: "unhide" },
						{ type: "separator" },
						{ role: "quit" },
					],
				},
		  ]
		: []),
	{
		label: "ROM",
		submenu: [
			{
				label: "Load ROM...",
				click: async () => {
					try {
						const result = await dialog.showOpenDialog({
							properties: ["openFile"],
						});

						if (!result.canceled) {
							await emulator.loadRom(result.filePaths[0]);
							mainWindow.webContents.send("romLoaded", null);
							emulator.start();
						}
					} catch (error) {
						throw error;
					}
				},
			},
		],
	},
];
export default (emulator: IEmulator, mainWindow: BrowserWindow) =>
	Menu.setApplicationMenu(
		Menu.buildFromTemplate(
			getTemplate(emulator, mainWindow) as (
				| MenuItemConstructorOptions
				| MenuItem
			)[]
		)
	);
