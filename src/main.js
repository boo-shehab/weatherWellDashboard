
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import vuetify from '@/plugins/vuetify'
import pinia from '@/store'
import router from '@/router'
import { createApp } from 'vue'

const app = createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(VueApexCharts);

app.mount('#app')
