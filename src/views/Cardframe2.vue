<template>
  <div class="about">
      <back :msg=msg></back>
      <van-notice-bar mode="closeable" class="title">为了展示更好的卡牌效果，建议合理控制字数</van-notice-bar>
      <div class="inner">
        <div class="history">
          <p>历史牌框({{ count }}/{{ list.length }})</p>
          <ul>
            <li v-for="(item,index) in list" @click="ipt(item,index)" :class="{on:count === index+1}"> 
              <van-image fit="contain" :src="item.img" class="pic" />
            </li>
          </ul>
        </div>

        <div class="two">
          <p>卡牌名称</p>
          <van-cell-group class="input" >
            <van-field v-model="senList.card_name" clearable  placeholder="卡牌名称" />
          </van-cell-group>
        </div>
        <div class="three">
          <p>效果</p>
          <van-cell-group class="input" >
            <van-field
              v-model="senList.card_rule"
              rows="2"
              type="textarea"
              maxlength="50"
              placeholder="请输入卡牌效果"
              clearable
              show-word-limit
            />
          </van-cell-group>
        </div>

        <div class="four">
          <p>职业</p>
          <ul>
            <li v-for="(item,index) in stoneList.hearthstone.card_class" @click="changeCareer(item.key)" :class="{on1:dataList.card_class === item.key}">
              
              <van-image 
                fit="contain" 
                round :src="item.icon" 
                class="pic" 
                @click="cardClass(item.key)"
              />
            </li>
          </ul>
        </div>
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns= options
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <div class="five">
          <ul>
            <li 
              v-for="(item,index) in stoneList.hearthstone.fixed_attr"
              @click="openPop(item.options,item.key)"
            >
              <p>{{ item.name }}</p>
              <input type="text" 
                readonly 
                v-model="items[index]"
                @click="showPicker = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
            </li>

            <li 
              v-for="(item,index) in arr"
              @click="openPop(item.options,item.key)"
              :class="{gg:cd[index] === 1}"
            >
              <p>{{ item.name }}</p>
              <input type="text" 
                readonly 
                v-model="items2[index]"
                @click="showPicker = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
            </li>
          </ul>
        </div>
        <div class="btn">
          <van-button @click="Preview" type="primary" class="show">预览</van-button>
          <van-button @click="creat" type="primary" class="creat">确认</van-button>
        </div>
        
        <div class="showPop">
          <van-popup v-model:show="showCenter" round :style="{ padding: '64px' }">
            <div class="piccc" >
            </div> 
            <van-image fit="contain" :src="PreviewList.img" class="pic" />
            <van-button @click="showCenter = false" type="default" class="btn">关闭预览</van-button>
          </van-popup>
        </div>
       
      </div>
     
 

  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted } from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { cardFrameHistoryListItem } from '@/api/model/homeModel';
  import { cardFrameHistoryApi , cardFrameCreatApi } from '@/api/home';
  import { showSuccessToast, showFailToast } from 'vant';
  import back from '@/components/back.vue'
  import stoneList from '@/settings/propertiesSetting'

  const cd:any = reactive([
    {
      i0:1
    },
    {
      i1:1
    },
    {
      i2:1
    },
    {
      i3:1
    },
    {
      i4:1
    },
  ])
  cd[1]=1
  cd[2]=1
  cd[3]=1
  cd[4]=1
  const arr:any = ref([
    stoneList.hearthstone.custom_attr.类型,
    stoneList.hearthstone.custom_attr.攻击力,
    stoneList.hearthstone.custom_attr.生命值,
    stoneList.hearthstone.custom_attr.耐久度,
    stoneList.hearthstone.custom_attr.随从类型,
  ])
  
  const items:any = reactive([
    {
      items0:''
    },
    {
      items1:''
    }
  ])
  const items2:any = reactive([
    {
      items0:''
    },
    {
      items1:''
    },
    {
      items2:''
    },
    {
      items3:''
    },
    {
      items4:''
    }
  ])
  items[0] = stoneList.hearthstone.fixed_attr[0].name
  items[1] = stoneList.hearthstone.fixed_attr[1].name
  items2[0] = stoneList.hearthstone.custom_attr.类型.name
  items2[1] = stoneList.hearthstone.custom_attr.攻击力.name
  items2[2] = stoneList.hearthstone.custom_attr.生命值.name
  items2[3] = stoneList.hearthstone.custom_attr.耐久度.name
  items2[4] = stoneList.hearthstone.custom_attr.随从类型.name
  // console.log(...stoneList.hearthstone.fixed_attr)
  const dataList:any = reactive({})
  const senList = reactive({
    batch_id:1,
    card_name:'',
    card_rule:'',
    data:{
    },
    game_id:'hearthstone',
    is_preview:0
  })
  const PreviewList = reactive({
    frame_id:1,
    img:''
  })
  const options = reactive([])
  const Key = ref('')
 
  const showCenter = ref(false)

  const showPicker = ref(false);

  const msg = ref('我是牌框')
  const list = reactive<cardFrameHistoryListItem[]>([])
  const count = ref(0)
  const num = ref('')
  const getData = async()=>{
    const queryState = reactive({game_id :'hearthstone'});
    const [error, data] = await awaitWrap(cardFrameHistoryApi(queryState));
    if (error || !data) {
        return;
    }
    Object.assign(list,data)
  }
  getData()

  const ipt = (item:any,index:number)=>{
    count.value = index+1
    senList.card_name = item.card_name
    senList.card_rule = item.card_rule
    dataList.card_class = item.data.card_class
    dataList.rarity = item.data.rarity
    dataList.cost = item.data.cost
    dataList.card_type = item.data.card_type
    items[0] = item.data.rarity
    items[1] = item.data.cost
    items2[1] = stoneList.hearthstone.custom_attr.攻击力.name
    items2[2] = stoneList.hearthstone.custom_attr.生命值.name
    items2[3] = stoneList.hearthstone.custom_attr.耐久度.name
    items2[4] = stoneList.hearthstone.custom_attr.随从类型.name
    if(item.data.card_type === 'minion'){
      items2[0] = '生物'
      cd[1] = 0
      cd[2] = 0
      cd[3] = 1
      cd[4] = 0
    }
    if(item.data.card_type === 'spell'){
      items2[0] = '法术'
      cd[1] = 1
      cd[2] = 1
      cd[3] = 1
      cd[4] = 1
    }
    if(item.data.card_type === 'weapon'){
      items2[0] = '武器'
      cd[1] = 0
      cd[2] = 1
      cd[3] = 0
      cd[4] = 1
    }
    if(item.data.card_type === 'hero'){
      items2[0] = '英雄'
      cd[1] = 1
      cd[2] = 1
      cd[3] = 0
      cd[4] = 1
    }
    if(item.data.attack){
      items2[1] = item.data.attack
      dataList.attack = item.data.attack
    }
    if(item.data.health){
      items2[2] = item.data.health
      dataList.health = item.data.health
    }
    if(item.data.durability){
      items2[3] = item.data.durability
      dataList.durability = item.data.durability
    }
    if(item.data.race){
      items2[4] = item.data.race
      dataList.race = item.data.race
    }
  }

  const changeCareer = (item:string)=>{
    num.value = item
  }

  const openPop = (data:any,key:any)=>{
    options.length = 0
    Object.assign(options,data)
    Key.value = key
    showPicker.value = true
  }
    const onConfirm = ( {selectedOptions}:any ) => {
      showPicker.value = false;
      items2[1] = stoneList.hearthstone.custom_attr.攻击力.name
      items2[2] = stoneList.hearthstone.custom_attr.生命值.name
      items2[3] = stoneList.hearthstone.custom_attr.耐久度.name
      items2[4] = stoneList.hearthstone.custom_attr.随从类型.name
      if(Key.value === 'rarity'){
        dataList.rarity = selectedOptions[0].value 
         items[0] = selectedOptions[0].value
         console.log(items)
      } 
      if(Key.value === 'cost'){
        dataList.cost = selectedOptions[0].value 
        items[1] = selectedOptions[0].value
      } 
      if(Key.value === 'card_type'){
        dataList.card_type = selectedOptions[0].value 
        items2[0] = selectedOptions[0].text
        if(selectedOptions[0].value === 'minion'){
          cd[1] = 0
          cd[2] = 0
          cd[3] = 1
          cd[4] = 0
        }else if(selectedOptions[0].value === 'spell'){
          cd[1] = 1
          cd[2] = 1
          cd[3] = 1
          cd[4] = 1
        }else if(selectedOptions[0].value === 'weapon'){
          cd[1] = 0
          cd[2] = 1
          cd[3] = 0
          cd[4] = 1
        }else if(selectedOptions[0].value === 'hero'){
          cd[1] = 1
          cd[2] = 1
          cd[3] = 0
          cd[4] = 1
        }
      } 
      if(Key.value === 'attack'){
        dataList.attack = selectedOptions[0].value 
        items2[1] = selectedOptions[0].value
      } 
      if(Key.value === 'health'){
        dataList.health = selectedOptions[0].value 
        items2[2] = selectedOptions[0].value
      } 
      if(Key.value === 'durability'){
        dataList.durability = selectedOptions[0].value 
        items2[3] = selectedOptions[0].value
      } 
      if(Key.value === 'race'){
        dataList.race = selectedOptions[0].value 
        items2[4] = selectedOptions[0].value
      } 
      console.log(dataList)
    };

  

    const cardClass = (data:string) =>{
      console.log(data)
      dataList.card_class = data.toString()
    }

    const creat = async()=>{
      senList.is_preview = 0
      console.log(senList)
      senList.data =JSON.stringify(dataList)
      if(!senList.card_name||!dataList.card_class||!dataList.rarity||!dataList.cost||!dataList.card_type){
        showFailToast('请将标注●的属性写完全哦')
        return
      }
      const [error, data] = await awaitWrap(cardFrameCreatApi(senList));
      if (error || !data) {
        return;
      }
      getData()
      senList.card_name = ''
      senList.card_rule = ''
      dataList.card_class = ''
      items[0] = '稀有度'
      items[1] = '法力值'
      items2[0] = '类型'
      items2[1] = '攻击力'
      items2[2] = '生命值'
      items2[3] = '耐久度'
      items2[4] = '随从类型'
      cd[1] = 1
      cd[2] = 1
      cd[3] = 1
      cd[4] = 1
      showSuccessToast('创建成功！')
      
    }
    const Preview = async()=>{
      senList.is_preview = 1
      senList.data =JSON.stringify(dataList)
      console.log(senList)
      
      if(!senList.card_name||!dataList.card_class||!dataList.rarity||!dataList.cost||!dataList.card_type){
        showFailToast('请将标注●的属性写完全哦')
        return
      }
      showCenter.value = true
      const [error, data] = await awaitWrap(cardFrameCreatApi(senList));
      if (error || !data) {
        return;
      }
      Object.assign(PreviewList,data)
    }
</script>

<style scoped lang="less">
.gg{
  display: none;
}
.bb{
  display: block;
}
.about{
    width: 100%;
    background-color: #11151B;
    --van-popup-background:1;
  }
  .title{
    height: 50px;
    margin-top:88px;
    background: rgb(123, 237, 228);
    color: #0f8a80;
    font-size: 20px;
  }
  .inner{
    width: 90%;
    margin-left: 40px;
    margin-top: 90px;
    .circle{
      width: 1px;
      height: 1px;
      background-color: red;
    }
    .history{
      width: 100%;
      p{
        color: white;
        display: block;
        font-size: 28px;
        width: 210px;
        text-align: left;
      }
      ul{
        width: 100%;
        margin-top: 30px;
        display: flex;
        overflow-y: hidden;
        overflow-x: auto;
        li{
          width: 170px;
          height: 280px;
          background-color: rgb(54, 72, 88);
          margin-left: 20px;
          float: left;
          .pic{
            width: 200px;
            height: 250px;
            position: relative;
            right: 20px;
          }
        }
        li:first-child{
          margin-left: 0;
        }
        .on{
          border: 1px solid green;
        }
      }
      
    }
    .two{
      width: 100%;
      margin-top: 50px;
      p{
        color: white;
        display: block;
        font-size: 28px;
        width: 210px;
        text-align: left;
      }
      p::before{
        width: 10px;
        height: 10px;
        border-radius: 100px;
        content: '';
        display: block;
        background-color: red;
        position: relative;
        top: 25px;
        left: 130px;
      }
      .input{
        position: relative;
        top: 10px;
      }
    }
    .three{
      width: 100%;
      margin-top: 30px;
      p{
        color: white;
        display: block;
        font-size: 28px;
        width: 210px;
        text-align: left;
      }
      .input{
        position: relative;
        top: 10px;
      }
    }
    .four{
      width: 100%;
      margin-top: 20px;
      p{
        color: white;
        display: block;
        font-size: 28px;
        width: 210px;
        text-align: left;
      }
      p::before{
        width: 10px;
        height: 10px;
        border-radius: 100px;
        content: '';
        display: block;
        background-color: red;
        position: relative;
        top: 28px;
        left: 70px;
      }
      ul{
        width: 100%;
        height: 200px;
        li{
          width: 70px;
          height: 70px;
          float: left;
          margin-left: 10px;
          margin-top: 20px;
          opacity: .5;
        }
        .on1{
          opacity: 1;
        }
      }
    }
    .five{
      width: 100%;
      margin-top: 20px;
      ul{
        width: 100%;
        height: 500px;
        li{
        width: 30%;
        height: 110px;
        margin-left: 20px;
        float: left;
        p{
          width: 100px;
          color: white;
          font-size: 25px;
          display: block;
          width: 210px;
          text-align: left;
        }
       
        .selected{
          width: 90%;
          height: 60px;
          background: #364858;
          color: white;
        }
        .icon{
            position: relative;
            right: -50px;
            top: -55px;
            font-size: 15px;
            color: #0f8a80;
        }
        }
      }
   
      
    }
    .btn{
      width: 100%;
      height: 120px;
      position: fixed;
      right: 0px;
      bottom: 100px;
      .creat{
        width: 40%;
        margin-left: 30px;
      }
      .show{
        width: 40%;
        background: green;
      }
    }
    .showPop{
      .piccc{
          background: linear-gradient(125deg,#37f5b3,#37f5b3 19%,#24a1cb 81%,#24a1cb);
          border: 0.267vw solid;
          -o-border-image: linear-gradient(138deg,#8c55fd,#9951de,#ff1616,#db24ac,#db23b2) 2 2;
          border-image: linear-gradient(138deg,#8c55fd,#9951de,#ff1616,#db24ac,#db23b2) 2 2;
          border-radius: 0.667vw;
          filter: blur(60px);
          width: 100%;
          height: 700px;
          position: relative;
      }
      .pic{
        margin-top: -650px;
      }
      .btn{
        width: 400px;
        height: 100px;
        position: relative;
        top: 80px;
        background: hsla(0,0%,100%,.275);
        color: #fff;
      }
    }
  }

</style>