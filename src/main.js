import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import jQuery from 'jquery'
import store from "@/scripts/store"
import router from "@/scripts/router";



createApp(App).use(router).use(store).use(router).mount('#login');
axios.defaults.baseURL = "http://localhost:8000";
global.$ = jQuery;
