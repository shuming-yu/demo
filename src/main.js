import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./plugins/lang";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import moment from "moment/moment";

import "./methods/ExPrototype";
import "./assets/all.scss";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import TriStateCheckbox from "primevue/tristatecheckbox";
import PanelMenu from "primevue/panelmenu";
import Sidebar from "primevue/sidebar";
import Menubar from "primevue/menubar";
import Card from "primevue/card";
import TieredMenu from "primevue/tieredmenu";
import TabMenu from "primevue/tabmenu";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import "primeflex/primeflex.css";
import ScrollTop from "primevue/scrolltop";
import Skeleton from "primevue/skeleton";
import Paginator from "primevue/paginator";
import Dropdown from "primevue/dropdown";

//  init
const app = createApp(App);

// swal設定
const options = {
  // confirmButtonColor: '#41b882',
  // cancelButtonColor: '#ff7674',
  showConfirmButton: false,
  timer: 1500,
};

window.moment = moment;
window.$axios = axios;

// use : 安裝插件
app.use(router);
app.use(i18n);
app.use(VueAxios, axios);
app.use(VueSweetalert2, options);
app.use(PrimeVue);
app.use(ToastService);

// component : 註冊全局組件
app.component("Loading", Loading);

app.component("Toast", Toast);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("TriStateCheckbox", TriStateCheckbox);
app.component("PanelMenu", PanelMenu);
app.component("Sidebar", Sidebar);
app.component("Menubar", Menubar);
app.component("Card", Card);
app.component("TieredMenu", TieredMenu);
app.component("TabMenu", TabMenu);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("ScrollTop", ScrollTop);
app.component("Skeleton", Skeleton);
app.component("Paginator", Paginator);
app.component("Dropdown", Dropdown);

app.mount("#app");
