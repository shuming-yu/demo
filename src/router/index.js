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
    path: '/nav',
    name: 'nav',
    component: () => import(/* webpackChunkName: "about" */ '../views/nav.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/userboard',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue')
      }
    ]
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('to', to);  // 到達哪個頁面
    // console.log('from', from);  // 從哪個頁面來
    // console.log('savedPosition', savedPosition);  // 畫面位置資訊
    // `to` 和 `from` 都是路由地址
    // `savedPosition` 可以為空，如果沒有的話。
  },
})

export default router
