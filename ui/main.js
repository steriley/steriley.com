import { createApp } from 'vue';
import VueLazyload from 'vue-lazyload';
import * as Sentry from '@sentry/vue';

import App from './App.vue';

const app = createApp(App);

Sentry.init({
  app,
  dsn: 'https://7237bfe60af54442a795f5f706b1e469@o185486.ingest.sentry.io/1279887',
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.25,
  tracePropagationTargets: ['localhost', /^https:\/\/steriley\.com\/api/],
});

app.use(VueLazyload);
app.mount('#app');
