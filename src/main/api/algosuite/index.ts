import { ipcMain } from 'electron';

import fs from 'fs';
import path from 'path';
import os from 'os';
import { getMDHMS } from '../../util';
import { getHL7 } from './help';

ipcMain.on('/algo/getHl7', async (event, arg) => {
  const data = getHL7(arg);
  if ('error' in data) {
    console.error(data.error);
    return event.reply('/algo/getHl7', {
      code: 5001,
      message: '处理数据失败',
    });
  }
  const suffix = getMDHMS();
  Object.entries(data).forEach(([filename, content]) => {
    const f = path.join(os.homedir(), 'Downloads', `${filename}_${suffix}.hl7`);
    // Write the data to the file
    fs.writeFile(f, content, (err) => {
      console.error(err);
      if (err) {
        event.reply('/algo/getHl7', {
          code: 5002,
          message: '无法写入文件',
        });
      }
    });
  });
  return event.reply('/algo/getHl7', {
    code: 0,
    message: '成功生成hl7文件，请在下载文件夹查看',
  });
});
