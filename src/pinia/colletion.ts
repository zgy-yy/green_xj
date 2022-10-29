import {defineStore} from "pinia";
import {reactive} from "vue";

export const useCollection = defineStore("collection", () => {
    const loveVideos = reactive<string[]>([])
    const loveSpecial = reactive<string[]>([])

    function addLoveVid(vid: string) {
        loveVideos.push(vid)
        document.cookie = `loveVideos=${loveVideos.toString()}`
    }

    function addLoveSpecial(spid: string) {
        loveSpecial.push(spid)
        document.cookie = `loveSpecial=${loveSpecial.toString()}`
    }

    function addFromCookie(spid: string[], vids: string[]) {

        if (spid.length !== 0) {
            loveSpecial.push(...spid)
        }
        if (vids.length !== 0) {

            loveVideos.push(...vids)
        }


    }

    return {loveVideos, loveSpecial, addLoveVid, addLoveSpecial, addFromCookie}
})