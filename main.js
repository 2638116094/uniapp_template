import App from './App'

// 引入主包依赖
// import TencentCloudChat  from "@tencentcloud/chat";
// import TUICore from "@tencentcloud/tui-core";


import Mock  from '@/mock/index.js'
// #ifndef VUE3
import Vue from 'vue'
// import './uni.promisify.adaptor'
// import VueCompositionAPI from "@vue/composition-api";
// Vue.use(VueCompositionAPI);
require('@/utils');
import store from './store'
import uView from '@/uni_modules/uview-ui/index.js'
Vue.use(uView)

console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
if(process.env.NODE_ENV === 'development') {
	// Mock.setup();
}

console.log('vue2')
Vue.config.productionTip = false
Vue.prototype.$store = store;
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
console.log('vue3')
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif