import { createApp } from 'vue';
import VueLazyload from 'vue-lazyload';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from "@sentry/tracing";

import App from './App.vue';

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://7237bfe60af54442a795f5f706b1e469@o185486.ingest.sentry.io/1279887",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", "steriley.com", /^\//],
    }),
  ],
  tracesSampleRate: 0.25,
});

app.use(VueLazyload);
app.mount('#app');
