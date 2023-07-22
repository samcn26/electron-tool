// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example' | any;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

// const apiHandler = {
//   api: {
//     send: (channel: Channels, ...args: any) => {
//       ipcRenderer.send(channel, args);
//     },
//     receive: (channel: Channels, func: (...args: any) => void) => {
//       ipcRenderer.on(channel, (event, ...args) => func(...args));
//     },
//   },
// };

contextBridge.exposeInMainWorld('electron', electronHandler);
// contextBridge.exposeInMainWorld('api', apiHandler);

export type ElectronHandler = typeof electronHandler;