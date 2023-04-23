<template>
  <div class="about">
    <navTitle :msg="msg"></navTitle>
    <div class="inner">
      <van-button type="primary" @click="showPop" class="vcd">邀请码</van-button>
    
        <button class="button" @click="myCardframe">我的牌框</button>
        <button class="button" @click="myArtBook">我的画集</button>
 
      
      <p class="input">输入描述</p>
     
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
     
      
          <div class="box1">
            <p class="input1">不知道如何输入,可尝试以下这些</p>
            <ul class="ul">
              <li 
                v-for="item in configList.words1" 
                @click="pushMessage(item.chinese)" 
                class="chineseLi"
              >
                {{item.name}}
              </li>
            </ul>
          </div>

          <div class="box2">
            <p class="input2">风格设置</p>
            <ul>
              <li v-for="item in configList.lora" :key="item.lora_id" class="li2">   
                <van-image 
                  :class="{on:changeID === item.lora_id}" 
                  fit="contain" 
                  :src="item.icon"
                  @click="changeId(item.lora_id)"
                  class="pic" 
                />
              </li>
            </ul>
          </div>

          <div class="box3">
            <p class="input2">{{ configList.words2[0].title }}</p>
            <p class="input3" @click="changeUl">{{ showUl }}</p>
            <ul :class="{maxUlChange:showUl === '收起'}" class="maxUl"> 
              <li  v-for="item in configList.words2[0].words" class="li3" @click="pushMessage(item)">{{ item }}</li>
            </ul>
          </div>

          <div class="box4">
            <p class="input2">{{ configList.words2[1].title }}</p>
            <p class="input3" @click="changeUl1">{{ showUl1 }}</p>
            <ul :class="{maxUlChange1:showUl1 === '收起'}" class="maxUl1">
              <li  v-for="item in configList.words2[1].words" class="li3" @click="pushMessage(item)">{{ item }}</li>
            </ul>
          </div>

          <div class="box5">
            <p class="input2">图片比例</p>
         
            <ul class="ul4">
              <li 
                v-for="item in size"
                :class="{on1:changeSize === item}"
                @click="proportion(item)"  
                class="imgscale"
              >
                <p class="pook"></p>
                <span>{{ item }}</span>
              </li>
            </ul> 
          </div>
            <!-- <p class="span1"></p>
            <p class="span2"></p>
            <p class="span3"></p>
            <p class="span4"></p>
            <p class="span5"></p> -->


      
      <van-button @click="picCreat" type="default" class="start">
        <p>开始绘制&nbsp;|&nbsp;消耗{{userInfoList.create_task_credits_score}}积分</p>
        <p>(余{{userInfoList.credits_score}}积分)</p>
      </van-button>
    </div>

   
    <van-popup v-model:show="show" closeable round :style="{ padding: '64px' ,right:'60px' }" >
      <p class="p1">我的邀请码</p>
      <div class="Btn">
        <van-button type="success" class="btn1">未使用</van-button>
        <ul v-for="item in codeList.unused">
          <li class="li">{{ item }}</li>
        </ul>
      </div>
      
      <div class="Btn">
        <van-button type="success" class="btn1">已使用</van-button>
        <ul v-for="item in codeList.used">
          <li class="li">{{ item }}</li>
        </ul>
      </div>
    </van-popup>
 

  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { codeList ,userInfo ,picCreat} from '@/api/model/homeModel';
  import { userCodelistApi , userpicGetConfigApi , getUserInfoApi , picCreatApi} from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import navTitle from '@/components/back.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const msg = ref('库拉索实验室')
  const show = ref(false);
  const bal = ref('3:4')
  const aal = ref(1)
  const changeID = ref(1)
  const changeSize = ref('3:4')
  const size = reactive(['3:4','4:3','1:1','16:9','9:16'])
  const showUl = ref('展开')
  const showUl1 = ref('展开')
  const codeList:codeList = reactive({
    used:{},
    unused:{}
  })
  const configList:any = reactive({
    is_activate:true,
    words1:{
      name:'',
      chinese:''
    },
    words2:[
      {
        title:'',
        words:{}
      },
      {
        title:'',
        words:{}
      }
    ],
    lora:{
      icon:'',
      lora_id:1,
      title:''
    }
  })
  const userInfoList:userInfo = reactive({
    create_task_credits_score :1,
    credits_score:1,
    rebuild_task_credits_score:1,
    task_in_progress:false,
    transform_task_credits_score:1,
  })
  const picCreatList:any = reactive({
    task_id:1
  })
  const message = ref('')
  const getCodeList = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(userCodelistApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(codeList,data)
  }
  getCodeList()

  const getconfigList = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(userpicGetConfigApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(configList,data)
  }
  getconfigList()

  const getUserInfo = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(getUserInfoApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(userInfoList,data)
  }
  getUserInfo()

  const picCreat = async()=>{
    const queryState = reactive({
      batch_id :1,
      task_words : message.value,
      aspect_ratio:bal.value,
      lora_ids:aal.value
    });
    console.log(queryState)
    const [error, data] = await awaitWrap(picCreatApi(queryState));
    if (error || !data) {
        return;
    }
    console.log(data)
    Object.assign(picCreatList,data)
    router.push({
      name:'Drawing',
      params:{
        id:picCreatList.task_id
      }
   })
  }
  const showPop = ()=>{
    show.value = true;
  }

  const pushMessage = (item:string)=>{
    message.value += item+','
  }
  
  const myCardframe = ()=>{
    router.push({
      name:'Cardframe',
    // params:{
    //   token:'login_token=239795be-8890-47dc-b29b-aeff8fd0191c'
    // }
   })
  }
  const myArtBook = ()=>{
    router.push({
      name:'ArtBook',
    // params:{
    //   token:'login_token=239795be-8890-47dc-b29b-aeff8fd0191c'
    // }
   })
  }
  const changeId = (id:number)=>{
    changeID.value = id
    aal.value = id
  }

  const changeUl = () =>{
    if( showUl.value === '展开'){
      showUl.value = '收起'
    }else{
      showUl.value = '展开'
    }
  }

  const changeUl1 = () =>{
    if( showUl1.value === '展开'){
      showUl1.value = '收起'
    }else{
      showUl1.value = '展开'
    }
  }

  const proportion = (item:any) =>{
    bal.value = item
    console.log(bal.value)
    changeSize.value = item
  }
</script>

<style scoped lang="less">
.about{
  width: 100%;
  background-color: #11151B;
  .inner{
    width: 90%;
    margin-left: 40px;
    margin-top: 90px;
  }
  .vcd{
    margin-top: 30px;
    width: 160px;
    height: 50px;
    background: linear-gradient(147deg, #74F193 0%, #40DFB6 100%);
    text-align: left;
    position: relative;
    left: -75px;
  }
  .button{
    width: 160px;
    height: 50px;
    background: #364858;
    margin-left: 20px;
    color: #B3D4FF;
    position: relative;
    top: 15px;
    left: 80px;
  }
  .Btn{
    height: 350px;
  }
  .p1{
  text-align: center;
  color: #000000;
  font-weight: 800;
  position: relative;
  top: -80px;
  right: 50px;
  }
  .btn1:nth-child(2){
    top: -50px;
  }
  .btn1{
    width: 500px;
    position: relative;
    right: 40px;
    top: 50px;
  }
  
  .li{
    position: relative;
    text-align: left;
    right: 35px;
    top: 60px;
  }
 
  .input{
    color: #F4F7FD;
    text-align: left;
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
    margin-top: 10px;
    font-size: 13px;
    font-weight: 350;
    height: 30px;
  }
  .input2{
    color: #F4F7FD;
    text-align: left;
    margin-top: 10px;
    font-size: 26px;
    font-weight: 500;
    height: 30px;
    line-height: 5px;
  }
  .input3{
    color: #3498ff;
    text-align: left;
    margin-top: -45px;
    font-size: 26px;
    font-weight: 500;
    margin-left: 600px;
  }
  .ul{
    height: 50px;
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .chineseLi{
    flex-shrink: 0;
    width: 130px;
    height: 50px;
    font-size: 24px;
    background: #364858;
    margin-left: 5px;
    margin-top: 5px;
    line-height: 45px;
    color: #B3D4FF;
  }
  .maxUl{
    max-height: 180px;
    margin-top: 10px;
    overflow: hidden;
  }
  .maxUlChange{
    max-height: inherit;
  }
  .maxUl1{
    max-height: 180px;
    margin-top: 10px;
    overflow: hidden;
  }
  .maxUlChange1{
    max-height: inherit;
  }
  .box1{
    width: 100%;
    height: 130px;
  }
  .box2{
    width: 100%;
    height: 280px;
  }
  .box3{
    width: 100%;
    margin-top: 20px;
  }
  .box4{
    margin-top: 50px;
    width: 100%;
  }
  .box5{
    margin-top: 30px;
    width: 100%;
    height: 400px;
    .ul4{
      .imgscale{
        width: 128px;
        height: 128px;
        background: #364858;
        float: left;
        margin-left: 7px;
        margin-top: 20px;
        
          
      }
      li:nth-child(1){
        .pook{
          width: 60px;
          height: 80px;
          background: #B3D4FF;
          margin: 20px auto 0;
        }
        span{
          display: block;
          margin-top: 40px;
          color: white;
          text-align: center;
          font-size: 23px;
        }
      }
      li:nth-child(2){
        .pook{
          width: 80px;
          height: 60px;
          background: #B3D4FF;;
          margin: 38px auto 0;
        }
        span{
          display: block;
          margin-top: 47px;
          color: white;
          text-align: center;
          font-size: 23px;
        }
      }
      li:nth-child(3){
        .pook{
          width: 80px;
          height: 80px;
          background: #B3D4FF;;
          margin: 30px auto 0;
        }
        span{
          display: block;
          margin-top: 35px;
          color: white;
          text-align: center;
          font-size: 23px;
        }
      }
      li:nth-child(4){
        .pook{
          width: 80px;
          height: 45px;
          background: #B3D4FF;;
          margin: 45px auto 0;
        }
        span{
          display: block;
          margin-top: 55px;
          color: white;
          text-align: center;
          font-size: 23px;
        }
      }
      li:nth-child(5){
        .pook{
          width: 45px;
          height: 80px;
          background: #B3D4FF;;
          margin: 30px auto 0;
        }
        span{
          display: block;
          margin-top: 35px;
          color: white;
          text-align: center;
          font-size: 23px;
        }
      }
    }
  }
 
  .li2{
    float: left;
    width: 220px;
    margin-left: 5px;
    
  }
  .on{
      border:3px solid blue;
    }
  .pic{
    height: 100px;
    
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


  .on1{
    border: 1px solid blue;
  }
  .start{
    width: 486px;
    height: 90px;
    background: linear-gradient(180deg, #37F5B3 0%, #0F44CA 100%);
    border-radius: 7px 7px 7px 7px;
    position: fixed;
    opacity: 1;
    right:150px;
    top: 90%;
    border: 2px solid #1671CC;
      p{
        color: white;
      }
  }
  .imgscale:first-child{
    margin-left: 0;
  }
}

.van-popup--center{
  right: 45px;
}
</style>