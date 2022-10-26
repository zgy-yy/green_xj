import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router/router";

import Vant from 'vant';
import 'vant/lib/index.css'
import {Lazyload} from 'vant';
document.cookie = 'xxx_api_auth=6633396234303634653562616261303761646234396431303837383665363438'

const app = createApp(App)
app.use(Vant);
app.use(Lazyload, {
    lazyComponent: true,
});

app.use(router)
// app.directive('m-scroll', mScroll)
app.mount('#app')
