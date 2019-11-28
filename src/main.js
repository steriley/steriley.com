import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import App from './App.vue';

Vue.use(VueLazyload);

Vue.config.productionTip = false;

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://7237bfe60af54442a795f5f706b1e469@sentry.io/1279887',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}

new Vue({
  render: h => h(App),
}).$mount('#app');
