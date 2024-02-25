import './assets/main.css'
import './assets/base.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import ValidationPulgin from './components/plugin/Validation'
import PrimeVuePlugin from './components/plugin/PrimeVue'
import BuiltInApp from './components/plugin/BuiltInApp.js'

import Thinh from '@/preset/Thinh' //import preset

import PrimeVue from 'primevue/config'
import { usePassThrough } from 'primevue/passthrough'

const app = createApp(App)
app.use(router)

app.use(createPinia())
app.use(ValidationPulgin)
app.use(BuiltInApp)
app.use(PrimeVuePlugin)

// const CustomPreset = usePassThrough(Thinh, {
//   mergeSections: true,
//   mergeProps: true
// })

app.use(PrimeVue, {
  ripple: true,
  unstyled: true,
  pt: Thinh,
  ptOptions: {
    mergeSections: true,
    mergeProps: true
  }
})
app.use(PrimeVue)

app.mount('#app')
