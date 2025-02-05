import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-icons/font/bootstrap-icons.css';


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)
app.mount('#app')
