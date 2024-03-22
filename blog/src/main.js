import './assets/main.css'
import './assets/base.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import ValidationPulgin from './components/plugin/Validation'
import PrimeVuePlugin from './components/plugin/PrimeVue'

import PrimeVue from 'primevue/config'

import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App)
app.use(router)

app.use(createPinia())
app.use(ValidationPulgin)
app.use(PrimeVuePlugin)
app.use(CKEditor)

app.use(PrimeVue, {
  ripple: true
})

app.mount('#app')
