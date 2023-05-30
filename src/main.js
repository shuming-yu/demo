import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './plugins/lang';

//  init
const app = createApp(App);

//  init plugin
app.use(router);
app.use(i18n);

app.mount('#app');
