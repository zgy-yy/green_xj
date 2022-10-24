<script setup lang="ts">
import {ref} from 'vue'
import Card from "./Card.vue";
import {useRouter} from "vue-router";
import {VideoInfo} from "../types/type";


interface Props {
  title: string,
  spid?: string,
  count?: number,
  videos: VideoInfo[]
}

const props = defineProps<Props>()

const router = useRouter()

function goPage() {
  if (props.spid) {
    console.log(props)
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
          <Card v-for="i in 10"></Card>
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
      border: 1px solid red;
    }

    & > span:last-child {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: .6rem;
      border: 1px solid red;
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
