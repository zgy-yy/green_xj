import {onActivated, onMounted} from "vue";
import {onBeforeRouteLeave} from "vue-router";

export function useScroll(view:string){
    let scroll = 0;
    let el: HTMLElement | null = null
    onMounted(() => {
        el = document.getElementById(view)
    })

    onBeforeRouteLeave(() => {

        if (el) {
            scroll = el.scrollTop
        }
    })

    onActivated(() => {
        if (el) {
            el.scrollTop = scroll
        }
    })
}