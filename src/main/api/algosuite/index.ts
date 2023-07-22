import { ipcMain } from 'electron';

ipcMain.on('/algo/getHl7', async (event, arg) => {
  console.log(arg);
  event.reply('/algo/getHl7', 'get it');
});
