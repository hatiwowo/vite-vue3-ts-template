import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const pathResolve = (dir: string) => `${resolve(__dirname, dir)}/`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@/': pathResolve('src'),
            '@images/': pathResolve('src/assets/images'),
            '@icons/': pathResolve('src/assets/icons')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @use "@/styles/utils/variables.scss" as *;
                @use "@/styles/utils/mixins.scss" as *;
                `
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 4000,
        cors: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});

