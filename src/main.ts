import { createApp } from 'vue'
import { Button } from 'vant'
import './style.css'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import "virtual:windi.css";
import router from './router/index'
const app = createApp(App)

app.use(router)
app.use(Vant)
app.mount('#app')
