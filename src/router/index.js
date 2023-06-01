import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  /* 重新導向說明：https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route */
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
