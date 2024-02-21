import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Validation from './components/plugin/Validation'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Validation)

app.mount('#app')
