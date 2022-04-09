import { isProd } from '.';

export default {
    baseURL: isProd ? '/' : '/api',
    timeout: 30000
};
