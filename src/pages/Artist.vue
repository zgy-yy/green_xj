<script setup lang="ts">

import {getChannels} from "../http/api";
import {onMounted, reactive, ref} from "vue";
import {Actor} from "../types/type";
import {useScroll} from "../hooks/useScroll";
import ActorC from "../components/ActorC.vue";
import Deck from "../components/Deck.vue";

interface Alphabet {
  alp: string,
  data: Actor[]
}

const actorLoading = ref(true)
useScroll('scroll')
const active = ref(0)


const actors = reactive<Alphabet[]>([])
//util
const pySegSort = (arr: Actor[]) => {
  let letters = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
  let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
  let segs: Alphabet[] = []
  letters.forEach((item, i) => {
    let cur: Alphabet = {alp: item, data: []}
    arr.map(item => {
      if (item.spname.localeCompare(zh[i]) >= 0 && item.spname.localeCompare(zh[i + 1]) < 0) {
        cur.data.push(item)
      }
    })
    if (cur.data.length) {
      cur.data.sort(function (a, b) {
        return a.spname.localeCompare(b.spname, 'zh')
      })
      segs.push(cur)
    }
  })

  return segs
}

const deckRow = reactive<Actor[]>([])
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// create
getChannels(1).then(res => {
  actorLoading.value=false
  // console.log(res)
  const actorRows = pySegSort(res.actorrows)
  actors.push(...actorRows)
})


const onLoad = () => {
  finished.value = false
  loading.value = true
  const nextPage = Math.ceil(deckRow.length / 16) + 1

  getChannels(nextPage).then(res => {
    deckRow.push(...res.rows)
    loading.value = false
    if (res.rows.length < 16) {
      finished.value = true
    }
  })
}

function onRefresh() {
  // 清空列表数据
  finished.value = false;
  deckRow.length=0
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  onLoad();
}

//切换tabs 首次展示
function handleFirstView(index: number) {
  if (index == 0) {
    return
  }
}

</script>

<template>
  <van-tabs class="page" v-model:active="active" @rendered="handleFirstView">
    <van-tab id="scroll" class="tabs" title="演员">
      <van-empty v-if="actorLoading" image="search" description="资源获取中..."/>
      <van-index-bar>
        <template v-for="item in actors">
          <van-index-anchor :index="item.alp">{{ item.alp }}</van-index-anchor>
          <ActorC v-for="v in item.data" :spid="v.spid" :img="v.avatar" :dec="v.spname"></ActorC>
        </template>
      </van-index-bar>
    </van-tab>

    <van-tab id="scroll1" class="tabs" title="频道">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >

          <Deck v-for="i in deckRow" :title="i.spname" :spid="i.spid" :videos="i.vodrows" :count="i.itemcount"></Deck>

        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;

  .tabs {
    overflow: auto;
    height: calc(100vh - 94px);
  }
}
</style>
