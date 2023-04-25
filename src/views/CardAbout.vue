<template>
  
  <div class="about">
    <back :msg=msg></back>
    <div class="inner">
      <van-image fit="contain" :src="cardData.img" class="pic" />
      <p class="created_at"> {{ formatTimestamp(cardData.created_at) }}</p>
      <div class="describe">
        <p>卡图描述</p>
        <p @click="copy">复制</p>
        <p>{{ cardData.words}}</p>
      </div>
      <van-button type="primary" @click="send" class="btn2">发送至广场</van-button>
      
      <sendShow :isShow="show" @showPop="showPop" :id="id"></sendShow>
      
      
      
    </div>
  
  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted} from 'vue'
  import { showSuccessToast , showFailToast , setToastDefaultOptions } from 'vant';
  import sendShow from '@/components/send.vue'
  setToastDefaultOptions({ duration: 500 });

  import { awaitWrap } from '@/utils/index';
  import type { PicInfoList } from '@/api/model/homeModel';
  import { PicInfoApi } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'
  import clipboard3 from 'vue-clipboard3';

  const msg = ref('')
  const show = ref(false)
  const { toClipboard } = clipboard3();
  const props = defineProps({
    id:{
      type:Number,
      required:true
    }
  })
  const id = props.id
  const cardData = reactive<PicInfoList>({
    created_at: 0,
    img: '',
    pic_id: 1,
    words:''
  })
  const getData = async()=>{
    const queryState = reactive({batch_id:1,pic_id :props.id});
    const [error, data] = await awaitWrap(PicInfoApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(cardData,data)
  }
  getData()

  const copy = async () => {
     try {
        await toClipboard(cardData.words);
        showSuccessToast('复制成功');
     } catch (error) {
      showFailToast('复制失败');
     }
    };
  
  const send = () =>{
      show.value = !show.value
  }
  const showPop = (data:boolean) =>{
    show.value = data
  }
</script>

<style scoped>
.about{
  width: 100%;
  height: 100%;
  background-color: #11151B;
}
.inner{
  width: 90%;
  margin-top: 90px;
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
  margin-top: 89px;
}
.p{
  font-size: 13px;
  vertical-align: middle;
  color: #FFFFFF;
  margin-left: 10px;
}

.pic{
  width: 710px;
  height: 840px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  position: relative;
  top: 30px;
  right: 20px;
}
.title{
  text-align: left;
  font-size: 13px;
  color: #FFFFFF;
}
.created_at{
  text-align: left;
  font-size: 13px;
  color: #819CC5;
  margin-top: 50px;
}
.describe{
  width: 100%;
  margin-top: 60px;
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
  margin-top: -35px;
  margin-left: 590px;
  text-align: right;
  font-size: 15px;
  width: 48px;
  height: 50px;
  color: #1380F0;
  font-weight: 400;
}
.describe p:nth-child(3){
  text-align: left;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 613px;
  height: 100%;
  margin-left: 30px;
  font-size: 23px;
  color: #A5BFE6;
  font-weight: 400;
}
.btn2{
  background-color: rgb(55, 245, 179);
  position: fixed;
  right: 80px;
}
</style>