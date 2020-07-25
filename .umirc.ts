import { defineConfig } from 'umi';
import config from './config/index'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: config.routes
});
