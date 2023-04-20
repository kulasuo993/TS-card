<template>
  
  <div class="about">
  
    <div class="inner">
        <back></back>
      <p class="card_name">{{ cardData.card_name }}</p>
      <div class="top">
        <van-image
          width="2rem"
          height="2rem"
          fit="cover"
          position="left"
          :src="cardData.avatar"
          class="avatar"
        />
        <span class="p">{{ cardData.nickname }}</span>
      </div>
      <van-image fit="contain" :src="cardData.img" class="pic" />
      <p class="title">{{ cardData.title }}</p>
      <p class="created_at"> {{ formatTimestamp(cardData.created_at) }}</p>
      <div class="describe">
        <p>卡图描述</p>
        <p>复制关键字</p>
        <p>{{ cardData.words}}</p>
      </div>
    </div>
  
  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { ImageInfo } from '@/api/model/homeModel';
  import { CardInfoApi } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'

  const props = defineProps({
    id:{
      type:Number,
      required:true
    }
  })
  const cardData = reactive<ImageInfo>({
    card_id: 0,
    nickname: '',
    avatar: '',
    img: '',
    title: '',
    card_name: '',
    words: '',
    likes_number: 0,
    review_status: 0,
    card_status: 0,
    publish_at: 0,
    created_at: 0,
    is_like: 0,
    can_same_clause: 0,
    can_del: 0
  })
  const getData = async()=>{
    const queryState = reactive({card_id :props.id});
    const [error, data] = await awaitWrap(CardInfoApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(cardData,data)
    console.log(cardData)
  }
  getData()
  // timestampToTime(11111111)

  console.log(cardData.created_at)
</script>

<style scoped>
.about{
  width: 100%;
  height: 100%;
  background-color: #11151B;
}
.inner{
  width: 90%;
  height: 100%;
  margin-left: 40px;
}
.top{
  text-align: left;
  margin-top: 30px;
}
.avatar{
  vertical-align: middle;
}
.card_name{
  color: #FFFFFF;
  font-size: 15px;
}
.p{
  font-size: 13px;
  vertical-align: middle;
  color: #FFFFFF;
  margin-left: 10px;
}

.pic{
  width: 616px;
  height: 740px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.title{
  text-align: left;
  font-size: 13px;
  color: #FFFFFF;
}
.created_at{
  text-align: left;
  margin-top: 30px;
  font-size: 13px;
  color: #819CC5;
}
.describe{
  width: 100%;
  height: 100%;
  margin-top: 30px;
  border: 1px solid black;
  background: #293D5C;
}
.describe p:nth-child(1){
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
  font-size: 15px;
  color: #FFFFFF;
  font-weight: 400;
}
.describe p:nth-child(2){
  margin-top: -20px;
  margin-right: 20px;
  text-align: right;
  font-size: 15px;
  color: #1380F0;
  font-weight: 400;
}
.describe p:nth-child(3){
  text-align: left;
  margin-top: 20px;
  width: 613px;
  height: 100%;
  margin-left: 30px;
  font-size: 23px;
  color: #A5BFE6;
  font-weight: 400;
}
</style>