import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { components, plugins } from './components';
import router from './router';
import App from './App.vue'
//导入组件库
import * as antIcons from '@ant-design/icons-vue'
const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
// 加载全局组件

const antIconsList: any = antIcons; // 重新赋值定义类型 避免后续遍历注册组件的时候ts报错
// 注册组件
// Object.keys(antIconsList).forEach(key => {
//     app.component(key, antIconsList[key])
// })
for (const key in antIconsList) {
    app.component(key, antIconsList[key])
}
app.config.globalProperties.$antIcons = antIcons; // 挂在到vue实例上

components.forEach((component:any) => {
    app.component(component.name, component);
  });
  
  // 加载全局插件
  plugins.forEach((plugin:any) => {
    app.use(plugin);
  });
  