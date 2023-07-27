/* eslint-disable */
const fs = require('fs');
const { isEqual } = require('lodash');
const Client  = require('ssh2-sftp-client'); // 使用ssh2-sftp-client模块

let client = null; // 全局sFTP客户端变量
let storeConfig = {};

// 创建sFTP客户端
async function createFTPClient({
  username, password, host, port
}) {
  const config = {
    username, password, host, port
  }
  try {
    if (Object.keys(storeConfig).length === 0) {
      storeConfig = {
        ...config,
      };
    }

    if (client) {
      // 如果配置相同返回同一个
      if (isEqual(storeConfig, config)) {
        console.log(`sFTP已连接`)
        return client;
      }
      // 关闭
      await client.end();
      client = null;
    }

    // 创建新的sFTP客户端
    const sftpConfig = {
      host: config.host,
      port: config.port, // 添加port配置
      username: config.username,
      password: config.password,
    };

    client = new Client();
    await client.connect(sftpConfig);

    console.log('sFTP连接成功');
    return client;
  } catch (error) {
    console.error(error)
    client = null
    return client
  }

}

// 上传文件
async function uploadFileToFTP(config) {
  // if (!client || !client._sshstream) {
  //   console.error('sFTP客户端未连接');
  //   return;
  // }

  const sftpClient = await createFTPClient(config); // 确保连接已建立
  if(!sftpClient) return false

  try {
    await sftpClient.put(config.localFilePath, `${config.remoteFolderPath}${config.filename}`);
    console.log(`${config.filename}文件上传成功`);
    return true
  } catch (err) {
    console.error(`${config.filename}文件上传失败:`, err);
    return false
  }
}

module.exports = { createFTPClient, uploadFileToFTP };
