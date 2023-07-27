import { POST } from './ipc';

export const getHl7 = (data: any) => {
  return POST('/algo/getHl7', data);
};
export const operateFtp = (data: {
  type: string;
  template: object;
  ftpCfg: object;
}) => {
  return POST('/algo/handleFtp', data);
};
