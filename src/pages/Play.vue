<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onActivated, onMounted, reactive, ref} from "vue";
import {getPlayInfo, getVideoComments, getVideoLike} from "../http/api";
import {CommeItem, VideoInfo} from "../types/type";
import {useCollection} from "../pinia/colletion";

const props = defineProps<{ id: string }>()
const  collectionStore=useCollection()
const lovIcon = ref('like-o')

const curId = ref(props.id)

const router = useRouter()
// onMounted(() => {
//   console.log(props)
// })

const videoObj = ref<VideoInfo>(null)
const m3u8Url = ref('')
const likeVideo = reactive<VideoInfo[]>([])
const comment = reactive<CommeItem[]>([])
const likeVideoLoading = ref(true)
const commentsLoading = ref(true)

function update(id: string) {
  if (collectionStore.loveVideos.includes(id)) {
    lovIcon.value = 'like'
  }else {
    lovIcon.value = 'like-o'
  }

  getPlayInfo(id).then(res => {
    console.log(res)
    m3u8Url.value = res.httpurl
  })
  getVideoLike(id).then(data => {
    likeVideo.push(...data.likerows)
    videoObj.value = data.vodrow
    // console.log(data)
    likeVideoLoading.value = false
  })
  getVideoComments(id).then(data => {
    // console.log(data)
    comment.push(...data.rows)
    commentsLoading.value = false
  })
}

update(curId.value)

function onClickLeft() {
  router.back()
}

function changeOrg(id:string) {
  likeVideoLoading.value=true
  commentsLoading.value=true
  update(id)
}
function addLove() {
  if (lovIcon.value == 'like') {
    collectionStore.loveVideos.filter((item) => {
      return item != curId.value
    })
    lovIcon.value = 'like-o'
  } else {
    collectionStore.addLoveVid(curId.value)
    lovIcon.value = 'like'
  }

}

</script>

<template>
  <div id="view" class="page">
    <van-icon @click="onClickLeft" class="back" name="arrow-left" size="1.3rem"/>
    <video controls>
      <source :src="m3u8Url" type="video/mp4">
      <!--      <source src="movie.ogg" type="video/ogg">-->
      您的浏览器不支持Video标签。
    </video>
    <van-notice-bar
        :scrollable="false"
        :text="videoObj?.title"
        background="#595857"
        color="white"
    >
      <template #right-icon>
        <van-icon  @click='addLove' :name="lovIcon" size="1.3rem"/>
      </template>
    </van-notice-bar>
    <p class="tit">相关推荐</p>
    <div class="likes">

      <van-skeleton title :row="3" :loading="likeVideoLoading">
        <van-card
            v-for="item in likeVideo"
            class="card"
            @click="changeOrg(item.vodid)"
            :key="item.vodid"
        >
          <template #thumb>
            <van-image
                class="img"
                :src="item.coverpic"
            />
          </template>
          <template #title>
            <p class="title">{{ item.title }}</p>
          </template>
          <template #tag>
            <p class="tag">{{ item.duration }}</p>
          </template>
          <template #tags>
            <div class="tags">
              <van-tag v-for="tag in item.tags.slice(0,item.tags.length>4?4:item.tags.length-1)" color="#f8e58c" text-color="#ec6800"
                       size="large">{{ tag.tagname }}
              </van-tag>
            </div>
          </template>
        </van-card>
      </van-skeleton>

    </div>
    <p class="tit">评论</p>
    <div class="comments">

      <van-skeleton title avatar :row="3" :loading="commentsLoading">
        <div class="comment-item" v-for="item in comment" :key="item.id">
          <div>
            <van-image
                round
                width="2rem"
                height="2rem"
                :src="item.avatar_url"
            />
            <span>{{ item.nickname }}</span>
          </div>
          <p>{{ item.content }}</p>
        </div>
      </van-skeleton>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/common";

.page {
  width: 100%;
  height: 100%;
  border: 1px solid rebeccapurple;
  overflow: auto;

  .back {
    position: absolute;
    z-index: 2;
    top: 2.3rem;
    left: 1rem;
    color: #f8b500;
  }

  video {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .tit {
    color: #f0908d;
    font-size: 1.2rem;
    padding: .5rem 0 .1rem .8rem;
  }

  .likes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;


    .card {
      padding: .4rem;
      width: 22.5rem;
      height: 7rem;

      .img {
        padding: 0;
        margin: 0;
        height: 110%;
        width: 10rem;
      }

      .title {
        margin-left: 5rem;
        font-size: 1rem;
        height: 1.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .tag {
        font-size: 1rem;
        position: relative;
        right: -10rem;
        top: 4.2rem;
        color: snow;
        transform: translateX(-110%);
      }

      .tags {
        //border: 1px solid red;
        margin-top: .5rem;
        width: 10.5rem;
        height: 4rem;
        margin-left: 5rem;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        //align-items: stretch;
        align-content: space-around;
        overflow: hidden;
      }
    }
  }

  .comments {
    .comment-item {

      padding: .2rem 1rem .1rem .8rem;

      & > div:first-child {
        flex-shrink: 0;
        display: flex;
        align-items: center;

        span {
          margin-left: 1.2rem;
          font-size: .7rem;
        }
      }

      & > p {
        text-indent: 1rem;
        margin-left: 1rem;
        font-size: 1rem;
      }
    }
  }
}
</style>
