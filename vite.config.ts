import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from "vite-plugin-windicss";
import px2vp from 'postcss-px2vp' // 用于将设计稿的 px 转换为 vw 单位
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),WindiCSS(),
    Components({
      resolvers: [VantResolver()],
    })],
  css: {
    postcss: {
      plugins: [
        px2vp({
          viewportWidth(rule) {
            const file = rule.source && rule.source?.input.file
            // 根据文件名动态配置viewport width
            if (file && file?.includes('vant')) return 375
            return 750
          },
          unitToConvert: 'px',
          unitPrecision: 3,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 750,
        }),
      ],
    },
  },
})
