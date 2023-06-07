import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './plugins/lang';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import './methods/ExPrototype';
import './assets/all.scss';

//  init
const app = createApp(App);

// use : 安裝插件
app.use(router);
app.use(i18n);
app.use(VueAxios, axios);
// app.provide('axios', app.config.globalProperties.axios);

// component : 註冊全局組件
app.component('Loading', Loading);

app.mount('#app');
