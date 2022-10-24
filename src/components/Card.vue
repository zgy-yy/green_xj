<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";

// const props = defineProps<{id:string,img:string,title:string,duration:string}>()
const router = useRouter()

function goPlayer() {
  router.push({name:'player',params:{id:Math.random()}})
}
</script>

<template>
  <div class="component" @click="goPlayer">
    <van-image
        lazy-load
        block
        width="100%"
        height="85%"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <span id="dur">30:31</span>
    <p>你好文本你好文本你好文本你好文本你好文本</p>
  </div>
</template>

<style scoped lang="scss">
.component {
  padding: 2px;
  height: 9rem;
  width: 11rem;
  position: relative;

  #dur {
    position: absolute;
    right: 0.3rem;
    top: 78%;
    transform: translateY(-50%);
    color: whitesmoke;
    font-size: .9rem;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .8rem;
  }
}
</style>
