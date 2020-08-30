import superagent from 'superagent';

import CommonAPI from './commonApi';

import Toast from '@/components/toast';

const HOST = 'https://api.t4f.app';
// const HOST = 'http://localhost:3000';

function formatRes(data: any) {
  if (data.code !== 0) {
    Toast.error(data.message);
    return false;
  }

  return data.data;
}

export default {
  post(path: string, params?: any) {
    return superagent
      .post(HOST + path)
      .send(params)
      .then(res => formatRes(res.body));
  },
  get(path: string, params?: any) {
    return superagent
      .get(HOST + path)
      .query(params)
      .then(res => formatRes(JSON.parse(res.text)));
  },
};

export { CommonAPI };
