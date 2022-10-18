/* eslint-disable*/
import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'

const routes = [
  {
    path: '/',
    redirect:'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),

  },
  {
    path: '/Home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import(/* webpackChunkName: "about", webpackPrefetch:true */ '../views/basketView.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about", webpackPrefetch:true */ '../views/testView.vue'),
  },
  {
    path: '/orderWait',
    name: 'orderWait',
    component: () => import(/* webpackChunkName: "about", webpackPrefetch:true */ '../views/orderwaitView.vue'),
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
