import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router/router";

import Vant from 'vant';
import 'vant/lib/index.css'
import {Lazyload} from 'vant';

const app = createApp(App)
app.use(Vant);
app.use(Lazyload, {
    lazyComponent: true,
});

app.use(router)
// app.directive('m-scroll', mScroll)
app.mount('#app')
