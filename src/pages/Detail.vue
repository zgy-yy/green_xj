<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onActivated, onMounted, reactive, ref} from "vue";
import Card from "../components/Card.vue";
import {getSpecialDetail} from "../http/api";
import {Actor, VideoInfo} from "../types/type";
import {useScroll} from "../hooks/useScroll";
import {useCollection} from "../pinia/colletion";

const collectionStore = useCollection()
const lovIcon = ref('like-o')

const props = defineProps<{ spid: string }>()
let lastSpid = props.spid
useScroll('page')
const loading = ref(true)

const route = useRoute()
const router = useRouter()

const videos = reactive<VideoInfo[]>([])
const actorMsg = ref<Actor>()
getSpecialDetail(props.spid).then(data => {
  loading.value = false
  videos.push(...data.vodrows)
  actorMsg.value = data.row
  // setVideos(data.vodrows)
})

let scrollEl: HTMLDivElement
let navBar: HTMLDivElement
onMounted(() => {
  scrollEl = document.getElementById('page') as HTMLDivElement
  navBar = document.querySelector('.nav-bar') as HTMLDivElement
})

onActivated(() => {
  const spid = route.params.spid as string
  if (collectionStore.loveSpecial.includes(spid)) {
    lovIcon.value = 'like'
  }else {
    lovIcon.value = 'like-o'
  }

  if (lastSpid == spid) {

    // console.log('same')
  } else {
    lastSpid = spid
    loading.value = true
    videos.length = 0
    actorMsg.value = null
    getSpecialDetail(spid).then(data => {
      loading.value = false
      videos.push(...data.vodrows)
      actorMsg.value = data.row
    })
  }
})

function handleScroll() {

  const top = scrollEl.scrollTop
  if (top > 300) {
    return
  }
  navBar.style.background = `rgba(82, 78, 77,${top / 200})`
}

function handleClickLeft() {
  router.back()
}

function addLove() {
  if (lovIcon.value == 'like') {
    collectionStore.loveSpecial.filter((item) => {
      return item != lastSpid
    })
    lovIcon.value = 'like-o'
  } else {
    collectionStore.addLoveSpecial(lastSpid)
    lovIcon.value = 'like'
  }

}
</script>

<template>
  <div id="page" class="page" @scroll="handleScroll">
    <van-nav-bar
        class="nav-bar"
        :title="actorMsg?.spname"
        left-text="返回"
        left-arrow
        @click-left="handleClickLeft"
    >
      <template #left>
        <p class="back"><van-icon color="white" name="arrow-left" /> 返回</p>
      </template>
      <template #title>
       <p class="title"> {{actorMsg?.spname}}</p>
      </template>
    </van-nav-bar>
    <van-empty v-if="loading" image="search" description="资源获取中..."/>
<!--  actorMsg?.coverpic  -->
    <div class="img-bar" :style="{backgroundImage:`url(${actorMsg?.coverpic})`}">
      <p><span>{{ actorMsg?.intro }}</span>
        <van-icon @click="addLove" :name="lovIcon"/>
      </p>
    </div>
    <div class="cards">
      <Card v-for="i in videos" :id="i.vodid" :img="i.coverpic" :title="i.title"
            :duration="i.duration" :key="i.vodid"></Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/common";

.page {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;

  .nav-bar {
    color: white;
    width: calc(100% - 10px);
    position: fixed;
    background: rgba(82, 78, 77, 0.3);
    .title{
      color: white;
    }
  }

  .img-bar {
    height: 15rem;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    & > p {
      //border: 1px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      width: 83%;
      bottom: 1rem;
      left: 2rem;
      color: white;

      span {
        @include text-nowrap();
      }
    }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  }
}
</style>
