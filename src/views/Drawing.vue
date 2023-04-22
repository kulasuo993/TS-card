<template>
  <div class="about">
      <back :msg=msg></back>
    
      <div class="inner">
        <p class="num">当前剩余{{ userInfoList.credits_score }}积分</p>
        <div :class="{hide:ishide === true}" class="box">
          <p>完成任务预计需要1-3分钟 <br>正在努力绘图中...</p>
        </div>
        <div v-for="item in List.pic_list" class="img">
          <img :src=item.img alt="">
        </div>

      </div>
     
 

</div>
</template>

<script lang="ts" setup>
  import {reactive,ref} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { userInfo  } from '@/api/model/homeModel';
  import { picTaskStatusApi , getUserInfoApi ,} from '@/api/home';
  import back from '@/components/back.vue'
  
  const msg = ref('绘制卡图')
  const timer = ref()
  const count = ref(1)
  const ishide = ref(false)
  const props = defineProps({
    id:{
      type:Number,
      required:true
    }
  })
  const userInfoList:userInfo = reactive({
    create_task_credits_score :1,
    credits_score:1,
    rebuild_task_credits_score:1,
    task_in_progress:false,
    transform_task_credits_score:1,
  })
  const List:any = reactive({
    task_id:1,
    task_status:1,
    task_desc:'',
    pic_list:{
      pic_id:1,
      img:'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png',
      status:true
    }
  })

 
  const picTaskStatus = async()=>{
    const queryState = reactive({batch_id :1,task_id:props.id});
    const [error, data] = await awaitWrap(picTaskStatusApi(queryState));
    if (error || !data) {
        return;
    }
     count.value = 1
     if(data.task_status != 3){
      Verification()
     }else{
      ishide.value = true
      Object.assign(List,data)
     }
  }
  picTaskStatus()

  const Verification = () => {
    timer.value = setInterval(() => {
      if (count.value > 0 && count.value <= 1) {
        count.value--;
      } else if (count.value === 0) {
        picTaskStatus();
        clearInterval(timer.value);
        timer.value = null;
      }
    }, 1000);
  }
  const getUserInfo = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(getUserInfoApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(userInfoList,data)
    console.log(userInfoList)
  }
  getUserInfo()
  
</script>

<style scoped lang="less">
.about{
  width: 100%;
  height: 1500px;
  background-color: #11151B;
}
.inner{
  width: 90%;
  height: 100%;
  margin-left: 40px;
  margin-top: 90px;
}
.num{
  color: #2fd6cb;
  width: 100%;
  height: 100px;
  text-align: left;
  border-bottom: 5px solid #727476;
  line-height: 120px;
  font-size: 24px;
}
.img{
  margin-top: 50px;
}
.box{
  width: 100%;
  height: 800px;
  border: 1px dashed white;
  margin-top: 30px;
  p{
    color: white;
    display: block;
    margin-top: 350px;
  }
}
.hide{
  display: none;
}
</style>