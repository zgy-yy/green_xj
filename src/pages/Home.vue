<script setup lang="ts">
import {getGlobalData, getHomeRecommendList} from "../http/api";
import Deck from "../components/Deck.vue";
import {useScroll} from "../hooks/useScroll";
import {Slide, VideoInfo} from "../types/type";
import {reactive, ref} from "vue";

interface RowInfo {
  title: string,
  videos: VideoInfo[]
}

useScroll('view')
const loading = ref(true)

const rows = reactive<RowInfo[]>([])
const swipers = reactive<Slide[]>([])
getHomeRecommendList().then(res => {
  loading.value = false
  let {
    v2sliderows: sliders,
    a_vodrows: selfie,
    b_vodrows: anime,
    c_vodrows: scriptures,
    d_vodrows: subtitles,
    dayrows: topLine,
    hotrows: hot,
    latestrows: news,
    likerows: guess,
    tagvodrows: outflow
  } = res
  const videoData: RowInfo[] = [
    {
      title: '头条',
      videos: topLine,
    }, {
      title: '最新视频',
      videos: news,
    }, {
      title: '猜你喜欢',
      videos: guess,
    }, {
      title: '自拍偷拍',
      videos: selfie,
    }, {
      title: '动漫',
      videos: anime,
    }, {
      title: '三级',
      videos: scriptures,
    }, {
      title: '中文字幕',
      videos: subtitles,
    }, {
      title: '热门',
      videos: hot,
    }, {
      title: '流出',
      videos: outflow,
    },
  ]
  console.log(videoData)

  sliders.map(item => {
    if (item.spid) {
      swipers.push(item)
      // return item
    }
  })
  rows.push(...videoData)
})


</script>

<template>
  <div class="page" id="view">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipers" :key="item.spid">
        <van-image
            block
            width="375px"
            fit="contain"
            :src="item.pic"
        />
      </van-swipe-item>
    </van-swipe>

    <div>
      <van-empty v-if="loading" image="search" description="资源获取中..."/>
      <Deck v-for="item in rows" :title="item.title" :videos="item.videos"></Deck>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  overflow: auto;

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>
