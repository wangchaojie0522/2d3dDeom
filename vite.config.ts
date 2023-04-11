import { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'; // 开启gzip
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';

import path from 'path'
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      hmr:true,
      port: 9000,
      proxy: {
        '/api': {
          changeOrigin: true,
          target: 'http://192.168.101.224:8000/'
        }
      }
    },
    resolve: {
      alias:{
        "@": path.resolve(__dirname, "src"),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
        }
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver(),
        ]
      }),
      viteCompression(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
      cesium()
    ]
  }
}
