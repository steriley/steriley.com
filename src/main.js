import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import App from './App.vue';
import router from './router';

Vue.use(VueLazyload);

Vue.config.productionTip = false;

Raven
  .config('https://7237bfe60af54442a795f5f706b1e469@sentry.io/1279887')
  .addPlugin(RavenVue, Vue)
  .install();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
