import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import Validation from './components/plugin/Validation'

import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara' //import preset

const app = createApp(App)
app.use(router)

app.use(createPinia())
app.use(Validation)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.mount('#app')
