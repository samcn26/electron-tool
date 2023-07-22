import { POST } from './ipc';

export const getHl7 = (data: any) => {
  return POST('/algo/getHl7', data);
};
