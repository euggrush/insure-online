import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  store
} from '../store/index.js'
import Home from '../views/Home.vue'
import AccountLogin from '../views/AccountAuth/AccountLogin.vue'
import AccountRegistration from '../views/AccountAuth/AccountRegistration.vue'
import AdminPanel from '../views/AdminPanel/AdminPanel.vue'
import InsurancePage from '../views/InsurancePage/InsurancePage.vue'
import NotFound from '../components/Errors/404.vue';
import QuoteOnline from '../views/ClientSide/QuoteOnline.vue'
import MyAccount from '../views/ClientSide/MyAccount.vue'

const routes = [{
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
    path: '/our-products',
    component: InsurancePage
  },
  {
    path: '/my-account',
    component: MyAccount,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      residentAuth: true
    }
  },
  {
    path: '/admin-panel',
    component: AdminPanel,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      residentAuth: false
    }
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404'
  },
  {
    path: "/quote-online",
    component: QuoteOnline
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.token === ``) {
      next('/')
    } else if (to.meta.adminAuth) {
      if (store.state.my_role === `admin`) {
        next()
      } else {
        next('/my-account')
      }
    } else if (to.meta.residentAuth) {
      if (store.state.my_role === `user`) {
        next()
      } else {
        next('/admin-panel')
      }
    }
  } else {
    next()
  }
})

export default router