import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      exclude: ['**/*.ts'],
      outDir: 'dist',
      compilerOptions: {
        rootDir: 'src/components',
      },
    }),
  ],
  build: {
    outDir: "dist",// 打包后的文件输出目录
    lib: {
      entry: "./src/components/entry.ts",//指定组件编译入口文件
      name: "vue3-pin-code",// 组件库名称
      fileName: "vue3-pin-code",// 文件名称
    },
    rollupOptions: {
      external: ["vue"],// 确保外部化处理那些你不想打包进库的依赖
      output: {
        // exports: "named",
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
