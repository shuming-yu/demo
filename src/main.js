import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './plugins/lang';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import './methods/ExPrototype';
import './assets/all.scss';

//  init
const app = createApp(App);

// swal設定
const options = {
  // confirmButtonColor: '#41b882',
  // cancelButtonColor: '#ff7674',
  showConfirmButton: false,
  timer: 1500,
};

// use : 安裝插件
app.use(router);
app.use(i18n);
app.use(VueAxios, axios);
// app.provide('axios', app.config.globalProperties.axios);
app.use(VueSweetalert2, options);
app.use(PrimeVue);
app.use(ToastService);

// component : 註冊全局組件
app.component('Loading', Loading);
app.component('Toast', Toast);

app.mount('#app');
