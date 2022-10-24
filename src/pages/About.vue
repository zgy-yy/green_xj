<script setup lang="ts">

import {onActivated, onMounted} from "vue";
import {onBeforeRouteLeave} from "vue-router";

let scroll = 0
let el: HTMLElement | null = null
onMounted(() => {
  el = document.getElementById("view")
})

onBeforeRouteLeave(() => {

  if (el) {
    scroll = el.scrollTop
  }
})

onActivated(() => {
  const el = document.getElementById("view")
  if (el) {
    el.scrollTop = scroll
  }
})
</script>

<template>
  <div id="view" class="page">
    about
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  border: 1px solid rebeccapurple;
}
</style>
