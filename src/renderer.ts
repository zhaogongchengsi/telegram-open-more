import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles/topbar.css'
import './styles/index.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
