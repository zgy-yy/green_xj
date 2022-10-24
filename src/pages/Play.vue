<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onActivated, onMounted} from "vue";

const props = defineProps<{ id: string }>()

const router = useRouter()
onMounted(() => {
  console.log(props)
})

function onClickLeft() {
  router.back()
}

function changeOrg(){
  console.log('change')
}
</script>

<template>
  <div id="view" class="page">
    <van-icon @click="onClickLeft" class="back" name="arrow-left" size="1.3rem"/>
    <video controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
      您的浏览器不支持Video标签。
    </video>
    <van-notice-bar
        :scrollable="false"
        text="、逝去的生活和失去的机会。"
        background="black"
        color="white"
    >
      <template #right-icon>
        <van-icon name="like-o" size="1.3rem"/>
      </template>
    </van-notice-bar>
    <p class="tit">相关推荐</p>
    <div class="likes">

      <van-card
          v-for="i in 4"
          class="card"
      >
        <template #thumb >
          <van-image
              @click="changeOrg"
              class="img"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
        </template>
        <template #title>
          <p class="title">没法哦就发哦哦哇嘎没法哦就发哦哦哇嘎没法哦就发哦哦哇嘎</p>
        </template>
        <template #tag>
          <p class="tag">38:12</p>
        </template>
        <template #tags>
          <div class="tags">
            <van-tag type="primary" size="large">标签标</van-tag>
            <van-tag type="primary" size="large">标签</van-tag>
            <van-tag type="primary" size="large">标签</van-tag>
            <van-tag type="primary" size="large">标签标签</van-tag>
          </div>
        </template>
      </van-card>
    </div>
    <p class="tit">评论</p>
    <div class="comments">

      <van-skeleton v-for="i in 3" title avatar :row="3" :loading="false" :key="i">
        <div class="comment-item">
          <div>
            <van-image
                round
                width="2rem"
                height="2rem"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <span>name</span>
          </div>
          <p>评论怕你评论怕你改好评论怕你改好评论怕你改好评论怕你改好评论怕你改好评论怕你改好评论怕你改好改好</p>
        </div>
      </van-skeleton>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/common";

.page {
  width: 100%;
  height: 100%;
  border: 1px solid rebeccapurple;
  overflow: auto;

  .back {
    position: absolute;
    z-index: 2;
    top: 1.2rem;
    left: 1rem;
    color: yellow;
  }

  video {
    border: 1px solid red;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .tit {
    color: red;
    font-size: 1.2rem;
    padding: .5rem 0 .1rem .8rem;
  }

  .likes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;


    .card {
      padding: .4rem;
      width: 22.5rem;
      height: 7rem;

      .img {
        padding: 0;
        margin: 0;
        height: 110%;
        width: 10rem;
      }

      .title {
        margin-left: 5rem;
        font-size: 1rem;
        height: 1.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .tag {
        font-size: 1rem;
        position: relative;
        right: -10rem;
        top: 4.2rem;
        color: snow;
        transform: translateX(-110%);
      }

      .tags {
        margin-top: .5rem;
        width: 9rem;
        height: 4rem;
        margin-left: 5rem;
        font-size: 1rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        //align-items: stretch;
        align-content: space-around;
      }
    }
  }

  .comments {
    .comment-item {

      padding: .2rem 1rem .1rem .8rem;

      & > div:first-child {
        flex-shrink: 0;
        display: flex;
        align-items: start;
        span{
          margin-left: 1.2rem;
        }
      }

      & > p {
        text-indent:1rem;
        margin-left: 1rem;
        font-size: .8rem;
      }
    }
  }
}
</style>
