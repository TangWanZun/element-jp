import Vue from 'vue'
import ElementUI from 'element-ui';

import {request} from '@/library/request'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import './main.less'

Vue.config.productionTip = false


Vue.use(ElementUI);

//挂载request
Vue.prototype.$request = request;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
