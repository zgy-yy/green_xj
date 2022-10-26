<script setup lang="ts">
import {ref} from 'vue'
import Card from "./Card.vue";
import {useRouter} from "vue-router";
import {VideoInfo} from "../types/type";


interface Props {
  title: string,
  spid?: string,
  count?: string,
  videos: VideoInfo[]
}

const props = defineProps<Props>()

const router = useRouter()

function goPage() {
  if (props.spid) {
    router.push({name: 'detail', params: {spid: props.spid}})
  }
}

</script>

<template>
  <lazy-component>
    <div class="component" v-lazy="title">
      <p><span>{{ title }}</span><span @click="goPage">{{ count }}<van-icon name="arrow"/></span></p>
      <div class="scroll-view">
        <div class="cards">
          <Card v-for="i in videos" :id="i.vodid" :img="i.coverpic" :title="i.title"
                :duration="i.duration" :key="i.vodid"></Card>
        </div>
      </div>
    </div>
  </lazy-component>
</template>

<style scoped lang="scss">
.component {
  box-sizing: content-box;

  p {
    & > span:first-child {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 80%;
    }

    & > span:last-child {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: .6rem;
    }

    padding: .8rem 1rem .5rem .2rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
  }

  .scroll-view {
    width: 100%;
    overflow-y: auto;
    height: 18.6rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .cards {
      height: 18.5rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
    }
  }

}
</style>
