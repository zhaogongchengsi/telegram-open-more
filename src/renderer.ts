import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import '@unocss/reset/tailwind.css'
import 'primeicons/primeicons.css'
import 'virtual:uno.css'
import './styles/topbar.css'
import './styles/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
