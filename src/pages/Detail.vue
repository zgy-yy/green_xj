<script setup lang="ts">
import {useRouter} from "vue-router";
import {onActivated, onMounted, ref} from "vue";
import Card from "../components/Card.vue";

const props = defineProps<{ spid: string }>()
const router = useRouter()

const list = ref([1, 12]);
const loading = ref(false);
const finished = ref(false);

let scrollEl: HTMLDivElement
let navBar: HTMLDivElement
onMounted(() => {
  scrollEl = document.querySelector('.page') as HTMLDivElement
  navBar = document.querySelector('.nav-bar') as HTMLDivElement
})

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 30) {
      finished.value = true;
    }
  }, 1000)
}

function handleScroll() {
  const top = scrollEl.scrollTop
  if (top>300){
    return
  }
  navBar.style.background = `rgba(218, 218, 118,${top/200})`
}

function handleClickLeft() {
  router.back()
}
</script>

<template>
  <div class="page" @scroll="handleScroll">
    <van-nav-bar
        class="nav-bar"
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="handleClickLeft"
    />
    <div class="img-bar">
      <p><span>desdespicdespicdes</span>
        <van-icon name="like-o"/>
      </p>
    </div>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <div class="cards">
        <Card v-for="item in list"></Card>
      </div>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/common";

.page {
  width: 100%;
  height: 100%;
  border: 1px solid rebeccapurple;
  overflow: auto;
  position: relative;

  .nav-bar {
    width: calc(100% - 10px);
    position: fixed;
    background: rgba(218, 218, 118, 0.3);
  }

  .img-bar {
    border: 1px solid red;
    height: 15rem;
    background-image: url("https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg");
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
