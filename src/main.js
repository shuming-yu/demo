import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './plugins/lang';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/all.scss';

//  init
const app = createApp(App);

//  init plugin
app.use(router);
app.use(i18n);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

app.mount('#app');
