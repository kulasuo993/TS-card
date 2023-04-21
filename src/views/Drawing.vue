<template>
  <div class="about">
      <back :msg=msg></back>
      <div class="inner">
        <!-- <img :src="data." alt=""> -->
        <div v-for="item in List.pic_list">
          <img :src=item.img alt="">
        </div>
      </div>
     
 

</div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { ImageInfo } from '@/api/model/homeModel';
  import { picTaskStatusApi } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'
  
  const msg = ref('绘制卡图')
  const timer = ref()
  const count = ref(1)
  const props = defineProps({
    id:{
      type:Number,
      required:true
    }
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
  console.log(List.pic_list.img)
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
      Object.assign(List,data)
     }
     console.log(List.pic_list)
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

</script>

<style scoped>
/* html{
  width: 100%;
  height: 1500px;
  background-color: #11151B;
} */
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
.vcd{
  margin-top: 30px;
  width: 160px;
  height: 60px;
  background: linear-gradient(147deg, #74F193 0%, #40DFB6 100%);
  text-align: left;
  display: block;
}
.btt{
 position: relative;
 top: -60px;
 left: 140px;
}
.button{
  width: 160px;
  height: 60px;
  background: #364858;
  margin-left: 20px;
  color: #B3D4FF;
}
.p1{
 margin-top: -80px;
 color: #000000;
 font-weight: 800;
}
.btn1:nth-child(2){
  margin-top: -70px;
}
.btn1{
  width: 450px;
  position: relative;
  right: 40px;
  margin-top: 50px;
}
.li{
  margin-right: 200px;
}
.x{
  font-size: 50px;
display: block;
position: absolute;
right: 50px;
top: 50px;
}
.input{
  color: #F4F7FD;
  text-align: left;
  margin-top: 20px;
  font-size: 13px;
}
.abc{
  position: relative;
  width: 98%;
  left: -30px;
}
.input1{
  color: #90A6BA;
  text-align: left;
  margin-top: 20px;
  font-size: 13px;
  font-weight: 350;
}
.chineseLi{
  width: 160px;
  height: 50px;
  background: #364858;
  margin-left: 5px;
  margin-top: 5px;
  line-height: 45px;
  float: left;
  color: #B3D4FF;
}
.input2{
  color: #F4F7FD;
  text-align: left;
  margin-top: 130px;
  font-size: 23px;
  font-weight: 500;
}
.ul2{
  margin-left: -10px;
}
.li2{
  float: left;
  width: 220px;
  margin-left: 5px;
}

.pic{
  height: 100px;
}

.ul3{
  margin-left: -10px;
}
.li3{
  width: 215px;
  height: 50px;
  background: #364858;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #536C82;
  font-size: 22px;
  line-height: 45px;
  color: #B3D4FF;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
</style>