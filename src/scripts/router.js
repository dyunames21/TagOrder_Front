import Cover from "@/views/Cover";
import Home from "@/views/Home";
import login from "@/views/login";
import Join from "@/views/Join";
import Cart from "@/views/Cart";
import Order from "@/views/Order"
import Orders from "@/views/Orders"
import Admin from "@/views/admin";
import Seller from "@/views/Seller";
import OrderData from '@/views/OrderData'
import {createRouter, createWebHistory} from "vue-router";

const routes=[
  {path:'/', component:Cover},
  {path:'/login', component:login},
  {path:'/join', component: Join},
  {path:'/home', component: Home},
  {path:'/cart', component: Cart},
  {path:'/order', component: Order},
  {path:'/orders', component: Orders},
  {path:'/admin',component: Admin},
  {path:'/seller',component: Seller},
  {path:'/orderdata',component: OrderData}


]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
