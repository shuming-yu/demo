// 參考 : https://easonchang0115.github.io/blogs/frontEnd/2021/20210625_1.html#vue-i18n-%E5%A5%97%E4%BB%B6
import { createI18n } from 'vue-i18n'

import en from '../i18n/en-US.json'; //  存放英文翻譯
import tw from '../i18n/zh-TW.json'; //  存放繁體中文翻譯
import cn from '../i18n/zh-CN.json'; //  存放簡體中文翻譯

const i18n = createI18n({
  legacy: false,
  locale: process.env.VUE_APP_Language, // 設定語言
  // fallbackLocale: 'tw',   // 若選擇的語言缺少翻譯則退回的語言
  messages: {
    'en-US': en,
    'zh-TW': tw,
    'zh-CN': cn
  }
});

export default i18n
