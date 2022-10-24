<script setup lang="ts">
import Card from "../components/Card.vue";
import {getGlobalData, getHomeRecommendList} from "../http/api";
import Deck from "../components/Deck.vue";

import {useScroll} from "../hooks/useScroll";
// getHomeRecommendList().then(res=>{
//   console.log(res)
// })
useScroll('view')

</script>

<template>
  <div class="page" id="view">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <div>
      <Deck title="Title" spid="1"></Deck>
      <Deck ></Deck>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  overflow: scroll;

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>
