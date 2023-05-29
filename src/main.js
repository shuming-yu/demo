import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n  from 'vue-i18n'

//import global json lang
import en from './i18n/en-US.json'; // 存放英文翻譯
import tw from './i18n/zh-TW.json'; // 存放繁體中文翻
import cn from './i18n/zh-CN.json'; // 存放簡體中文翻

//init setting
Vue.config.productionTip = false;

//init plugin
Vue.use(VueI18n)
Vue.use(router)

//init 
const i18n = getGlobalI18n();

new Vue({
  router,
  i18n,
  // store,
  // vuetify,
  render: h => h(App)
}).$mount('#app');

// createApp(App).use(router).mount('#app')


/**
 * 設定語系 i18n
 */
function getGlobalI18n() {
  return new VueI18n({
    locale: process.env.VUE_APP_Language, // 語言標識
    messages: {
      "en-US": en,
      'zh-TW': tw,
      'zh-CN': cn,
    }
  });
}