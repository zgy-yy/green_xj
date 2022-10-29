<script setup lang="ts">
import {onActivated, onMounted, reactive, ref} from 'vue'
import Card from "../components/Card.vue";
import {useScroll} from "../hooks/useScroll";
import {VideoInfo} from "../types/type";
import {getCats} from "../http/api";
import {useTagsStore} from "../pinia/tags";

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

const store = useTagsStore()


//标签 分类
const requestParam = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
const activateCatIndex = ref(0)
const cats = reactive([{text: '全部', value: 0}])
const videos = reactive<VideoInfo[][]>([])
for (let i = 0; i < 12; i++) {
  videos[i] = []
}

const options: OptKV[][] = reactive([
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},],
  [{text: '全部', value: 0},]
])
// create
getCats(0, 0, 0, 0, 0, 0, 0, 0, 0, 1).then(res => {
  // console.log(res)
  const catKv = res.categories.map(item => transKv(item.catename, item.cateid))//分类
  const areaKv = res.areas.map(item => transKv(item.areaname, item.areaid))//地区
  const yearkv = res.years.map(item => transKv(item.yearname, item.yearid))//年份
  const definitionkv = res.definitions.map(item => transKv(item.value, item.keyid))//分辨
  const freekv = res.freetypes.map(item => transKv(item.value, item.keyid))//
  const longvoicekv = res.langvoices.map(item => transKv(item.value, item.keyid))//
  const durationKv = res.durations.map(item => transKv(item.value, item.keyid))//市场
  const mosaickv = res.mosaics.map(item => transKv(item.value, item.keyid))//
  const orderkv = res.orders.map(item => transKv(item.value, item.keyid))//排序
  cats.push(...catKv)
  options[0].push(...areaKv)
  options[1].push(...longvoicekv)
  options[2].push(...yearkv)
  options[3].push(...orderkv)
  options[4].push(...mosaickv)
  options[5].push(...durationKv)
  options[6].push(...definitionkv)
  options[7].push(...freekv)

  // console.log(videos)
  // console.log(activateCatIndex.value)
})

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);


const onLoad = () => {
  finished.value = false
  loading.value = true

  updateVideos()
}

function onRefresh() {
  // 清空列表数据
  finished.value = false;
  videos[activateCatIndex.value] = []
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  onLoad();
}

function updateVideos() {
  const nextPage = Math.ceil(videos[activateCatIndex.value].length / 16) + 1
  requestParam[9] = nextPage

  return getCats(requestParam[0], requestParam[1], requestParam[3], requestParam[7], requestParam[6], requestParam[8],
      requestParam[5], requestParam[2],requestParam[4],requestParam[9]).then(res => {
    videos[activateCatIndex.value].push(...res.vodrows)
    if (res.vodrows.length < 16) { //如果没有数据
      finished.value = true
    }
    refreshing.value = false
    loading.value = false
  })
}

//下拉框 改变，获取新数据
function handleDropdownChange(index: number, value: number) {
  requestParam[index + 1] = value
  onRefresh()
}

function handleFirstView(index: number) {
  if (index == 0) {
    return
  }
  const catid = cats[index].value
  requestParam[0] = catid
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
    <van-tabs v-model:active="activateCatIndex" swipeable @rendered="handleFirstView">
      <van-tab id="scroll" class="tabs" v-for="(i,index) in cats" :title="i.text" :key="i.value">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <div class="list">
              <Card v-for="item in videos[index]" :id="item.vodid" :img="item.coverpic" :title="item.title"
                    :duration="item.duration" :key="item.vodid"></Card>
            </div>
          </van-list>
        </van-pull-refresh>
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
