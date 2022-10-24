<script setup lang="ts">

import {getChannels} from "../http/api";
import {reactive, ref} from "vue";
import {Actor} from "../types/type";
import {useScroll} from "../hooks/useScroll";
useScroll('scroll')
useScroll('scroll1')
const active = ref(0)

const indexList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



const actors = reactive<Actor[]>([])
onload = (() => {

  getChannels(0).then(res => {
    const actorRows = res.actorrows
    actorRows.sort((a, b) => a.spname.localeCompare(b.spname, 'zh')); //a~z 排序
    actors.push(...actorRows)
    // console.log(actors)
  })
})

</script>

<template>
  <van-tabs class="page" v-model:active="active">
    <van-tab id="scroll" class="tabs" title="标签1">
      <van-index-bar>
        <van-index-anchor index="A">标题1</van-index-anchor>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
        <van-cell title="文本"/>

        <van-index-anchor index="B">标题2</van-index-anchor>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
        <van-cell title="文本"/>

        <van-index-anchor index="3">标题3</van-index-anchor>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
        <van-cell title="文本"/>

        <van-index-anchor index="4">标题4</van-index-anchor>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
        <van-cell title="文本"/>

        <van-index-anchor index="5">标题5</van-index-anchor>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
        <van-cell title="文本"/>

        <van-index-anchor index="6">标题6</van-index-anchor>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
        <van-cell title="文本"/>
      </van-index-bar>
    </van-tab>
    <van-tab id="scroll1"  class="tabs" title="标签2">

    </van-tab>
  </van-tabs>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  border: 1px solid rebeccapurple;

  .tabs {
    overflow: auto;
    height: calc(100vh - 94px);
    border: 1px solid red;
  }
}
</style>
