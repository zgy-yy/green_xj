<script setup lang="ts">

import {onMounted, reactive} from "vue";
import {useCollection} from "../pinia/colletion";
import {getSpecialDetail, getVideoLike} from "../http/api";
import {useRouter} from "vue-router";

interface Love {
  title: string,
  pic: string,
  id:string
}

const special = reactive<Love[]>([])
const vidos = reactive<Love[]>([])


const collectionStore = useCollection()

onMounted(() => {
  collectionStore.loveSpecial.map(item => {
    getSpecialDetail(item).then(res => {
      let love: Love = {
        title: res.row.spname,
        pic: res.row.coverpic,
        id:res.row.spid
      }
      special.push(love)
    })
  })

  collectionStore.loveVideos.map(item => {
    getVideoLike(item).then(res => {
      let love: Love = {
        title: res.vodrow.title,
        pic: res.vodrow.coverpic,
        id:res.vodrow.vodid
      }
      vidos.push(love)
    })
  })
})

const router = useRouter()
function goPlayer(vid:string) {
  router.push({name: 'player', params: {id: vid}})
}
function goDetail(spid:string) {
    router.push({name: 'detail', params: {spid: spid}})
}
</script>

<template>
  <div id="view" class="page">
    <h2>special</h2>
    <div class="scroll-box">
      <div class="actor" v-for="item in special" :key="item.id" @click="goDetail(item.id)">
        <van-image
            fit="cover"
            width="22rem"
            height="100px"
            :src="item.pic"
            lazy-load
        />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <h2>videos</h2>
    <div class="scroll-box">
      <div class="actor" v-for="item in vidos" :key="item.id" @click="goPlayer(item.id)">
        <van-image
            fit="cover"
            width="22rem"
            height="100px"
            lazy-load
            :src="item.pic"
        />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/common";

.page {
  width: 100%;
  height: calc(100% - 44px);
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
    padding: .5rem;
    color: #d9333f;
  }

  h2:last-of-type {
    color: #ea5506;
  }

  .scroll-box {
    overflow: auto;
  }

  .actor {
    //border: 1px solid red;
    position: relative;

    p {
      @include text-nowrap();
      position: absolute;
      bottom: 1rem;
      left: 2.1rem;
      color: white;
    }
  }
}
</style>
