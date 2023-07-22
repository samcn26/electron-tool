export const POST = (path: string, data: any) => {
  window.electron.ipcRenderer.sendMessage(path, data);
};
export const GET = (path: string, func: (data: any) => void) =>
  window.electron.ipcRenderer.on(path, func);
