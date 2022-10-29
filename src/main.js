import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import jQuery from 'jquery'
import store from "@/scripts/store"
import router from "@/scripts/router";



createApp(App).use(router).use(store).mount("#app");
axios.defaults.baseURL = "http://localhost:9000";
global.$ = jQuery;
