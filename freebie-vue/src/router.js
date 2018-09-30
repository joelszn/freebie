import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/businesses',
      name: 'businesess',
      component: () => import('./views/BusinessList.vue'),
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: () => import('./views/BusinessDonate.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('./views/Leaderboard.vue'),
    },
    {
      path: '/companyprofile',
      'name': 'companyProfile',
      component: () => import('./views/CompanyProfile.vue'),
    }
  ]
})
