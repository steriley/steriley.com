import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

import App from './App.vue';
import router from './router';

Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
