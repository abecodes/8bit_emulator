import { IpcRendererEvent } from "electron";

export default (window as Window &
	typeof globalThis & {
		api: {
			send: (eventName: string, payload: any) => void;
			sendSync: <T>(eventName: string, payload: any) => T;
			addListener: (
				eventName: string,
				listener: (event: IpcRendererEvent, ...args: any[]) => void
			) => void;
			removeListener: (
				eventName: string,
				listener: (event: IpcRendererEvent, ...args: any[]) => void
			) => void;
		};
	}).api;
