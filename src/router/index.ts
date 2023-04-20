import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from "../views/HomeView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component:Home
  },
  {
    path: '/about/:id',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    props: (router) => {
      return {
        id: router.params.id ? Number(router.params?.id) : 0,
      };
    },
  },
  {
    path: '/laboratory/:token',
    name: 'laboratory',
    component: () => import('../views/laboratory.vue'),
    props: (router) => {
      return {
        id: router.params.id ? Number(router.params?.id) : 0,
      };
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
