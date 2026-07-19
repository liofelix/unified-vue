import { createApp } from 'vue'
import 'dayjs/locale/zh-cn'

import App from './App.vue'
import { useAppConfig } from './hooks/useAppConfig'
import i18n from './locales'
import router from './router'
import pinia from './stores'
import 'virtual:svg-icons-register'
import '@/assets/styles/index.css'
import '@/assets/styles/base.scss'

const { appTitle } = useAppConfig()
document.title = appTitle

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')
