<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onActivated, onMounted, reactive, ref} from "vue";
import Card from "../components/Card.vue";
import {getSpecialDetail} from "../http/api";
import {Actor, VideoInfo} from "../types/type";
import {useScroll} from "../hooks/useScroll";

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
  console.log(1)
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
      // setVideos(data.vodrows)
    })
  }
  // console.log(route.params)

})

function handleScroll() {

  const top = scrollEl.scrollTop
  console.log(scrollEl)
  if (top > 300) {
    return
  }
  navBar.style.background = `rgba(238, 238, 0,${top / 200})`
}

function handleClickLeft() {
  router.back()
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
    />
    <van-empty v-if="loading" image="search" description="资源获取中..."/>
    <div class="img-bar" :style="{backgroundImage:`url(${actorMsg?.coverpic})`}">
      <p><span>{{ actorMsg?.intro }}</span>
        <van-icon name="like-o"/>
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
    width: calc(100% - 10px);
    position: fixed;
    background: rgba(238, 238, 0, 0.3);
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
