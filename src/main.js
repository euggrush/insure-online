import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store, Axios} from './store'

createApp(App).use(store).use(Axios).use(router).mount('#app')
