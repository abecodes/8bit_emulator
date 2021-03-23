import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";

contextBridge.exposeInMainWorld("api", {
	send: (eventName: string, payload: any) =>
		ipcRenderer.send(eventName, payload),
	sendSync: (eventName: string, payload: any) =>
		ipcRenderer.sendSync(eventName, payload),
	addListener: (
		eventName: string,
		listener: (event: IpcRendererEvent, ...args: any[]) => void
	) => ipcRenderer.addListener(eventName, listener),
	removeListener: (
		eventName: string,
		listener: (event: IpcRendererEvent, ...args: any[]) => void
	) => ipcRenderer.removeListener(eventName, listener),
});
