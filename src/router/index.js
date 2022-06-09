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
import PayPalPage from "../components/PaymentSystem/PayPalPage.vue";
import YocoPayment from "../components/PaymentSystem/YocoPage.vue";
import AboutUs from "../components/Partials/AboutUs";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm.vue";
import NewPasswordGenerate from "../components/Partials/NewPasswordGenerate.vue";
import ClientPortal from "../views/ClientSide/ClientPortal.vue";
import MyOrderSingle from "../views/ClientSide/MyOrders/MyOrderSingle.vue";

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
    component: LoginForm
  },
  {
    path: '/reset-password',
    component: ResetPasswordForm
  },
  {
    path: '/new-password',
    component: NewPasswordGenerate
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/about-us',
    component: AboutUs
  },
  {
    path: '/our-products',
    component: InsurancePage
  },
  {
    path: '/my-portal',
    component: ClientPortal,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      residentAuth: true
    }
  },
  {
    path: '/my-orders',
    component: MyOrderSingle,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      residentAuth: true
    }
  },
  {
    path: '/my-payment',
    component: PayPalPage,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      residentAuth: true
    }
  },
  {
    path: '/yoco-payment',
    component: YocoPayment,
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