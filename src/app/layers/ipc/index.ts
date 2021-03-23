import { ipcMain, IpcMainEvent } from "electron";

export const addListener = (
	eventName: string,
	listener: (event: IpcMainEvent, ...args: any[]) => void
) => ipcMain.addListener(eventName, listener);

export const removeListener = (
	eventName: string,
	listener: (event: IpcMainEvent, ...args: any[]) => void
) => ipcMain.removeListener(eventName, listener);
