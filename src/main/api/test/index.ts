import { ipcMain } from 'electron';
import crud, { InputArgs } from '../crud';

ipcMain.on('api', async (event, { type, db, data, query }: InputArgs) => {
  console.log('api', { type, db, data, query });
  const res = await crud[type]({ db, data, query });
  event.reply('api', { [db]: res });
});
