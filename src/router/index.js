import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import {
  store
} from '../store/index.js'
import Home from '../views/Home.vue'
import LoginForm from '../components/Forms/LoginForm.vue';
import AdminPanel from '../views/AdminPanel/AdminPanel.vue';
import InsurancePage from '../views/InsurancePage/InsurancePage.vue';
import NotFound from '../components/Errors/404.vue';
import RegistrationForm from '../components/Forms/RegistrationForm.vue';
import MyAccount from '../views/ClientSide/MyAccount.vue';
import MyOrdersPage from '../views/ClientSide/MyOrdersPage';


const isTokenExpired = (tokenExpiration) => {
  const dayjs = require("dayjs");
  let tokenTime = dayjs(tokenExpiration).valueOf();
  let currentTime = Date.now();
  if (tokenTime < currentTime) {
    return true;
  }
  return false;
};

const routes = [{
    path: '/login',
    name: 'Login',
    component: LoginForm,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
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
    path: '/my-quotes',
    component: MyOrdersPage,
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
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
  {
    path: "/registration",
    component: RegistrationForm
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.token === `` || isTokenExpired(store.state.toke_expiration_time)) {
      next('/login')
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