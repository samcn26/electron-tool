/* eslint-disable */
import { ipcMain } from 'electron';

import fs from 'fs';
import path, { resolve } from 'path';
import os from 'os';
import { getMDHMS } from '../../util';
import { getHL7 } from './help';
import { createFTPClient, uploadFileToFTP } from '../../ftp/ftpclient';

ipcMain.on('/algo/getHl7', async (event, arg) => {
  const data = getHL7(arg);
  if ('error' in data) {
    console.error(data.error);
    event.reply('/algo/response', {
      code: 5001,
      message: '处理数据失败',
    });
    return;
  }
  let isSuccess = true;
  const suffix = getMDHMS();
  Object.entries(data).forEach(([filename, content]) => {
    const f = path.join(os.homedir(), 'Downloads', `${filename}_${suffix}.hl7`);
    // Write the data to the file
    try {
      fs.writeFileSync(f, content);
    } catch (error) {
      console.error(err);
      if (err) {
        isSuccess = false;
        event.reply('/algo/response', {
          code: 5002,
          message: `无法写入${filename}文件`,
        });
      }
    }
  });

  if (isSuccess) {
    event.reply('/algo/response', {
      code: 0,
      message: '成功生成hl7文件，请在下载文件夹查看',
    });
  }
});

ipcMain.on('/algo/handleFtp', async (event, arg) => {
  // handle FTP
  const { type, template, ftpCfg: { sandbox, ...ftpConfig } = {} } = arg;

  // 处理template
  const data = getHL7(template);
  Object.entries(data).forEach(([fname, content]) => {
    const filename = `tmp_${fname}.hl7`;
    // 生成临时文件
    const f = path.join(os.homedir(), 'Downloads', filename);
    // Write the data to the file
    try {
      fs.writeFileSync(f, content);
    } catch (error) {
      if (err) {
        console.error(err);
        event.reply('/algo/response', {
          code: 5002,
          message: `无法写入${filename}文件`,
        });
      }
    }
  });

  // sandbox
  const sdx = sandbox[0];

  let ftpOp = ['order', 'observation'];
  if (type !== 'together') {
    ftpOp = [type];
  }

  for (const k of ftpOp) {
    let filename = `tmp_${k}.hl7`;
    const localFilePath = path.join(os.homedir(), 'Downloads', filename);
    const remoteFolderPath = `${sdx.rootpath}/${sdx[k]}/`;
    const isUpload = await uploadFileToFTP({
      ...ftpConfig,
      localFilePath,
      remoteFolderPath,
      filename,
    });
    if (isUpload) {
      fs.renameSync(
        localFilePath,
        path.join(os.homedir(), 'Downloads', `tmp_${k}_done.hl7`)
      );
      event.reply('/algo/response', {
        code: 0,
        message: `发送${k}至${sdx.name}成功`,
      });
      if (type === 'together') {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
});
