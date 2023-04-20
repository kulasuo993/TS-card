<template>
  <div class="about">
    <div class="inner">
      <back></back>
      <p style="color: #FFFFFF">营地AI实验室</p>
      <van-button type="primary" @click="getCodeList" class="vcd">邀请码</van-button>
      <div class="btt">
        <button class="button">我的牌框</button>
        <button class="button">我的画集</button>
      </div>
      
      <p class="input">输入描述</p>
      <van-cell-group inset class="abc">
        <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="2000"
            placeholder="多个关键词描述画面，以逗号拼接。如：年轻女孩，氛围感，长发，夜空"
            show-word-limit
            clearable 
            style="font-size: 5px;"
          />
      </van-cell-group>
      
      <p class="input1">不知道如何输入,可尝试以下这些</p>
      <ul v-for="item in configList.words1" class="ul">
        <li @click="pushMessage(item.chinese)" class="chineseLi">{{item.name}}</li>
      </ul>

      <p class="input2">风格设置</p>
      <ul v-for="item in configList.lora" class="ul2">
        <li class="li2">   
           <van-image fit="contain" :src="item.icon" class="pic" />
        </li>
      </ul>

      <p class="input2">{{ configList.words2[0].title }}</p>
      <ul v-for="item in configList.words2[0].words" class="ul3">
        <li class="li3" @click="pushMessage1(item)">{{ item }}</li>
      </ul>

      <p class="input2">{{ configList.words2[1].title }}</p>
      <ul v-for="item in configList.words2[1].words" class="ul3">
        <li class="li3" @click="pushMessage2(item)">{{ item }}</li>
      </ul>
    </div>

    <van-popup v-model:show="show" round :style="{ padding: '64px' }">
      <p class="p1">我的邀请码</p>
      <van-icon name="cross" @click="close" class="x" />
      <van-button type="success" class="btn1">未使用</van-button>
      <ul v-for="item in codeList.unused">
        <li class="li">{{ item }}</li>
      </ul>
      <van-button type="success" class="btn1">已使用</van-button>
      <ul v-for="item in codeList.used">
        <li class="li">{{ item }}</li>
      </ul>
    </van-popup>
 

  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { ImageInfo } from '@/api/model/homeModel';
  import { userCodelistApi , userpicGetConfigApi } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'
  
  const show = ref(false);
  const codeList = reactive({
    used:{},
    unused:{}
  })
  const configList:any = reactive({
    is_activate:true,
    words1:{
      name:'',
      chinese:''
    },
    words2:[{
      title:'',
      words:[]
    },
    {
      title:'',
      words:[]
    }],
    lora:{
      icon:'',
      lora_id:1,
      title:''
    }
  })
  const message = ref('')
  const getCodeList = async()=>{
    show.value = true;
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(userCodelistApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(codeList,data)
  }
  const getconfigList = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(userpicGetConfigApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(configList,data)
    console.log(configList.words2)
  }
  getconfigList()
  
  const close = ()=>{
    show.value = false
  }
  const pushMessage = (item:string)=>{
    message.value += item+','
  }
 
  const pushMessage1 = (item:string)=>{
    message.value += item+','
  }
  const pushMessage2 = (item:string)=>{
    message.value += item+','
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