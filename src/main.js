import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store, axios} from './store'

createApp(App).use(store).use(axios).use(router).mount('#app')
