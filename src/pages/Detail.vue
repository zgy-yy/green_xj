<script setup lang="ts">
import {useRouter} from "vue-router";
import {onActivated} from "vue";

const router = useRouter()

function onClickLeft() {
  router.back()
}
</script>

<template>
  <div class="page">
    <van-nav-bar
        class="img-bar"
        title="详细"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  border: 1px solid rebeccapurple;
  .img-bar{
    border: 1px solid red;
  }
}
</style>
