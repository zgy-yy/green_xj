<script setup lang="ts">
import {ref} from "vue";

const active = ref(0);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive exclude="Play">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
  <van-tabbar v-show="true" :fixed="false" route v-model="active" active-color="#aa4c8f">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/artist" icon="label-o">频道</van-tabbar-item>
    <van-tabbar-item to="/category" icon="friends-o">分类</van-tabbar-item>
    <van-tabbar-item to="/about" icon="gift-card-o">收藏</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .68s ease;
}

</style>
