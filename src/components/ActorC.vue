<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";
const props = defineProps<{spid:string,img:string,dec:string}>()
const router = useRouter()

function goDetail() {
  if (props.spid) {
    router.push({name: 'detail', params: {spid: props.spid}})
  }
}

</script>

<template>
  <div class="component" @click="goDetail">
    <van-image
        round
        fit="cover"
        width="2.3rem"
        height="2.3rem"
        :src="img"
    />
    <p>{{dec}}</p>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/common";

.component {
  padding: .2rem 1rem .5rem 1rem;
  //border: 1px solid red;
  display: flex;
  align-items: center;
  font-size: 1.3rem;

  & > div {
    flex-shrink: 0;
  }

  p {
    @include text-nowrap();
    padding-left: 1rem;
  }
}
</style>
