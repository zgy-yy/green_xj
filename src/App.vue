<script setup lang="ts">
import {ref} from "vue";

const active = ref(0);
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Play">
      <transition name="fade">
        <component :is="Component"/>
      </transition>
    </keep-alive>
  </router-view>

  <van-tabbar v-show="true" :fixed="false" route v-model="active">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/artist" icon="search">搜索</van-tabbar-item>
    <van-tabbar-item to="/category" icon="friends-o">分类</van-tabbar-item>
    <van-tabbar-item to="/about" icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity .68s ease;
}

</style>
