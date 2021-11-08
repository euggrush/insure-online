import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AccountLogin from '../views/AccountLogin.vue'
import AccountRegistration from '../views/AccountRegistration'
import AccountPage from '../views/UserPage/UserPage'
import AdminPanel from '../views/AdminPanel/AdminPanel'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: AccountLogin
  },
  {
    path: '/signup',
    component: AccountRegistration
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-account',
    component: AccountPage
  },
  {
    path: '/admin-panel',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
