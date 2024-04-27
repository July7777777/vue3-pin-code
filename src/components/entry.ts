import pinCode from './pinCode.vue'
import { App, Plugin } from 'vue'

pinCode.install = (app: App) => {
  app.component('pinCode', pinCode)
  return app
}
export default pinCode as typeof pinCode & Plugin
/**
 * 这里是重点，需要将这些组件在ts中声明为全局组件；
 */
declare module "vue" {
  export interface GlobalComponents {
    pinCode: typeof pinCode
  }
}