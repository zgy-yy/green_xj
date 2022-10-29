import {defineStore} from "pinia";
import {reactive} from "vue";

export const useTagsStore = defineStore('tags', () => {
    const tags = reactive([0, 0, 0, 0, 0, 0, 0, 0])

    function tagArea(num: number) {
        tags[0] = num
    }

    return {tags, tagArea}
})