import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/nav',
    component: () => import('../views/nav.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/Login.vue'),
      },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
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
