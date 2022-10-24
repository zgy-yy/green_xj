<script setup lang="ts">
import {onActivated, onMounted, reactive, ref} from 'vue'
import Card from "../components/Card.vue";
import {useScroll} from "../hooks/useScroll";
import {KV, VideoInfo} from "../types/type";
import {getCats} from "../http/api";

interface OptKV {
  text: string,
  value: number
}

function transKv(text: string, value: number) {
  return {
    text: text,
    value: value
  }
}


useScroll('scroll')

//标签 分类
const requestParam = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
const activateCatIndex = ref(0)
const cats = reactive([{text: '全部', value: 0}])
const videos = reactive<VideoInfo[][]>([])

const options: OptKV[][] = reactive([
  [{text: '全部', value: 0},],
  [{text: '全部全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部全部', value: 0},],
  [{text: '全部', value: 0},]
])

onMounted(() => [
  getCats(0, 0, 0, 0, 0, 0, 0, 0, 0, 1).then(res => {
    // console.log(res)
    const catKv = res.categories.map(item => transKv(`${item.cateid}`, item.cateid))//分类
    const areaKv = res.areas.map(item => transKv(item.areaname, item.areaid))//地区
    const yearkv = res.years.map(item => transKv(item.yearname, item.yearid))//年份
    const definitionkv = res.definitions.map(item => transKv(item.value, item.keyid))//分辨
    const freekv = res.freetypes.map(item => transKv(item.value, item.keyid))//
    const longvoicekv = res.langvoices.map(item => transKv(item.value, item.keyid))//
    const durationKv = res.durations.map(item => transKv(item.value, item.keyid))//市场
    const mosaickv = res.mosaics.map(item => transKv(item.value, item.keyid))//
    const orderkv = res.orders.map(item => transKv(item.value, item.keyid))//排序
    cats.push(...catKv)
    options[0].push(...freekv)
    options[1].push(...yearkv)
    // options[0].push(...areaKv)
    // options[0].push(...areaKv)
    videos.length = cats.length + 1
    videos[0] = res.vodrows
  })
])

const loading = ref(false);
const finished = ref(false);

const onLoad = () => {

  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  // setTimeout(() => {
  //   for (let i = 0; i < 3; i++) {
  //     list.value.push(list.value.length + 1);
  //   }
  //
  //   // 加载状态结束
  //   loading.value = false;
  //
  //   // 数据全部加载完成
  //   if (list.value.length >= 9) {
  //     finished.value = true;
  //   }
  // }, 1000)
}

//根据分类加载数据，用于初始加载
function getVideosByCatId(catID: number) {

  getCats(catID, 0, 0, 0, 0, 0, 0, 0, 0, 1).then(res => {
    videos[activateCatIndex.value] = res.vodrows
    // console.log(res)
  })
}

function updateVideos() {
  getCats(...requestParam).then(res => {
    videos[activateCatIndex.value] = res.vodrows
    // console.log(res)
  })
}

//下拉框 改变，获取新数据
function handleDropdownChange(index: number, value: number) {
  requestParam[index + 1] = value
  console.log(activateCatIndex.value)
}

function handleFirstView(index: number) {
  console.log(activateCatIndex)
  if (index == 0) {
    return
  }

  const catid = cats[index].value
  requestParam[0] = catid
  getVideosByCatId(catid)
}
</script>

<template>
  <div class="page">
    <div class="dropdown">
      <van-dropdown-menu class="dropdown-menu" @change="handleDropdownChange">
        <van-dropdown-item v-for="(opt,index) in options" v-model="requestParam[index+1]" :options="opt"
                           @change="(value)=>handleDropdownChange(index,value)"
                           :key="index"/>
      </van-dropdown-menu>
    </div>
    <van-tabs v-model:active="activateCatIndex" swipeable type="card" @rendered="handleFirstView">
      <van-tab id="scroll" class="tabs" v-for="(i,index) in cats" :title="i.text" :key="i.value">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <div class="list">
            <Card v-for="item in videos[index]"></Card>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>

</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;

  .dropdown {
    overflow-y: auto;

    .dropdown-menu {
      width: 36rem;
    }
  }


  .tabs {
    overflow: auto;
    height: calc(100vh - 94px - 48px);

    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      justify-items: center;
    }
  }
}
</style>
