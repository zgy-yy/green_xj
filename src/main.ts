import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router/router";

import Vant from 'vant';
import 'vant/lib/index.css'
import {Lazyload} from 'vant';
import {createPinia} from "pinia";
import {useCollection} from "./pinia/colletion";
document.cookie = 'xxx_api_auth=6633396234303634653562616261303761646234396431303837383665363438'

function getCookie(name:string){
    let strcookie = document.cookie;//获取cookie字符串
    let arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( let i = 0; i < arrcookie.length; i++) {
        let arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}


const app = createApp(App)
app.use(Vant);
app.use(Lazyload, {
    lazyComponent: true,
});
app.use(createPinia())
app.use(router)
// app.directive('m-scroll', mScroll)
app.mount('#app')

const colStore=useCollection()
const spicArr:string[]=[]
const videArr:string[]=[]
const specialStr = getCookie('loveSpecial')
const videoStr = getCookie('loveVideos')
if(specialStr!==''){
    spicArr.push(...specialStr.split(','))
}
if(videoStr!==''){
    videArr.push(...videoStr.split(','))
}
colStore.addFromCookie(spicArr,videArr)