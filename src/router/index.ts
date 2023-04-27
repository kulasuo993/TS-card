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
    path: '/aboutpic/:id',
    name: 'aboutpic',
    component: () => import('../views/AboutPic.vue'),
    props: (router) => {
      return {
        id: router.params.id ? Number(router.params?.id) : 0,
      };
    },
  },
  {
    path: '/laboratory/:id?',
    name: 'laboratory',
    component: () => import('../views/laboratory.vue'),
    props: (router) => {
      return {
        token:router.params.token ? Number(router.params?.token) : 0,
        id: router.params.id ? Number(router.params?.id) : 0,
      };
    },
  },
  {
    path: '/Cardframe',
    name: 'Cardframe',
    component: () => import('../views/Cardframe.vue'),
    // props: (router) => {
    //   return {
    //     id: router.params.id ? Number(router.params?.id) : 0,
    //   };
    // },
  },
  {
    path: '/ArtBook',
    name: 'ArtBook',
    component: () => import('../views/ArtBook.vue'),
   
    // props: (router) => {
    //   return {
    //     id: router.params.id ? Number(router.params?.id) : 0,
    //   };
    // },
  },
  {
    path: '/Drawing/:id',
    name: 'Drawing',
    component: () => import('../views/Drawing.vue'),
   
    props: (router) => {
      return {
        id: router.params.id ? Number(router.params?.id) : 0,
      };
    },
  },  
  {
    path: '/CardAbout/:id',
    name: 'CardAbout',
    component: () => import('../views/CardAbout.vue'),
    props: (router) => {
      return {
        id: router.params.id ? Number(router.params?.id) : 0,
      };
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
