import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import jQuery from 'jquery'
import store from "@/scripts/store"
import router from "@/scripts/router";



createApp(App).use(router).use(store).mount("#app");
axios.defaults.baseURL = " 3.39.78.87:9000/";
global.$ = jQuery;
