import Vue from 'vue'
import ElementUI from 'element-ui';

import App from './App.vue'
import router from './router/index.js'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './main.less'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
