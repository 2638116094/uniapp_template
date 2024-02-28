import App from './App'

// 引入主包依赖
// import TencentCloudChat  from "@tencentcloud/chat";
// import TUICore from "@tencentcloud/tui-core";


// #ifndef VUE3
import Vue from 'vue'
// import './uni.promisify.adaptor'
// import VueCompositionAPI from "@vue/composition-api";
// Vue.use(VueCompositionAPI);
import store from './store'
import uView from '@/uni_modules/uview-ui/index.js'
Vue.use(uView)

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