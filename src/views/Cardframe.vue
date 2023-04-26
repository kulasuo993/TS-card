<template>
  <div class="about">
      <back :msg=msg></back>
      <van-notice-bar mode="closeable" class="title">为了展示更好的卡牌效果，建议合理控制字数</van-notice-bar>
      <div class="inner">
        <div class="history">
          <p>历史牌框({{ count }}/{{ list.length }})</p>
          <ul>
            <li v-for="(item,index) in list" @click="ipt(item)" :class="{on:count === index+1}"> 
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
              autosize
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

        <div class="five">
          <ul>
            <li>
              <p>稀有度</p>
              <input type="text" 
                v-model="dataList.rarity" 
                readonly 
                placeholder="稀有度" 
                @click="showPicker = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.fixed_attr[0].options"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
                />
              </van-popup>
            </li>

            <li>
              <p>法术力</p>
              <input type="text" 
                v-model="dataList.cost" 
                readonly 
                placeholder="法术力" 
                @click="showPicker1 = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker1" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.fixed_attr[1].options"
                  @cancel="showPicker1 = false"
                  @confirm="onConfirm1"
                />
              </van-popup>
            </li>

            <li>
              <p>类型</p>
              <input type="text" 
                v-model="dataList.card_type" 
                readonly 
                placeholder="类型" 
                @click="showPicker2 = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker2" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.custom_attr.类型.options"
                  @cancel="showPicker2 = false"
                  @confirm="onConfirm2"
                />
              </van-popup>
            </li>
            <li v-if="dataList.card_type === 'minion'||dataList.card_type === 'weapon'">
              <p>攻击力</p>
              <input type="text" 
                v-model="dataList.attack" 
                readonly 
                placeholder="类型" 
                @click="showPicker3 = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker3" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.custom_attr.攻击力.options"
                  @cancel="showPicker3 = false"
                  @confirm="onConfirm3"
                />
              </van-popup>
            </li>

            <li v-if="dataList.card_type === 'minion'">
              <p>生命值</p>
              <input type="text" 
                v-model="dataList.health" 
                readonly 
                placeholder="类型" 
                @click="showPicker4 = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker4" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.custom_attr.生命值.options"
                  @cancel="showPicker4 = false"
                  @confirm="onConfirm4"
                />
              </van-popup>
            </li>
            <li v-if="dataList.card_type === 'weapon'||dataList.card_type === 'hero'">
              <p>耐久度</p>
              <input type="text" 
                v-model="dataList.durability" 
                readonly 
                placeholder="耐久度" 
                @click="showPicker5 = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker5" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.custom_attr.耐久度.options"
                  @cancel="showPicker5 = false"
                  @confirm="onConfirm5"
                />
              </van-popup>
            </li>
            <li v-if="dataList.card_type === 'minion'">
              <p>随从类型</p>
              <input type="text" 
                v-model="dataList.race" 
                readonly 
                placeholder="随从类型" 
                @click="showPicker6 = true"
                class="selected"
              >
              <van-icon name="arrow-down" class="icon" />
              <van-popup v-model:show="showPicker6" round position="bottom">
                <van-picker
                  :columns="stoneList.hearthstone.custom_attr.随从类型.options"
                  @cancel="showPicker6 = false"
                  @confirm="onConfirm6"
                />
              </van-popup>
            </li>
          </ul>
         
        </div>
        <div class="btn">
          <van-button @click="Preview" type="primary" class="show">预览</van-button>
          <van-button @click="creat" type="primary" class="creat">确认</van-button>
        </div>
        
        <van-popup v-model:show="showCenter" round :style="{ padding: '64px' }" class="abc">
          <div class="piccc" >
            
          </div> 
          <van-image fit="contain" :src="PreviewList.img" style="margin-top: -450px;" />
          <van-button @click="showCenter = false" type="primary" style="margin-top: 80px;">关闭预览</van-button>
        </van-popup>
      </div>
     
 

  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref } from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { cardFrameHistoryListItem } from '@/api/model/homeModel';
  import { cardFrameHistoryApi , cardFrameCreatApi } from '@/api/home';
  import { showSuccessToast, showFailToast } from 'vant';
  import back from '@/components/back.vue'
  import stoneList from '@/settings/propertiesSetting'

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
  const showCenter = ref(false)

  const showPicker = ref(false);
  const showPicker1 = ref(false);
  const showPicker2 = ref(false);
  const showPicker3 = ref(false);
  const showPicker4 = ref(false);
  const showPicker5 = ref(false);
  const showPicker6 = ref(false);

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
    console.log(list)
  }
  getData()

  const ipt = (item:any)=>{
    senList.card_name = item.card_name
    senList.card_rule = item.card_rule
    dataList.card_class = item.data.card_class
    dataList.rarity = item.data.rarity
    dataList.cost = item.data.cost
    dataList.card_type = item.data.card_type
    if(item.data.attack){
      dataList.attack = item.data.attack
    }
    if(item.data.health){
      dataList.health = item.data.health
    }
    if(item.data.durability){
      dataList.durability = item.data.durability
    }
    if(item.data.race){
      dataList.race = item.data.race
    }
    console.log(senList)
  }

  const changeCareer = (item:string)=>{
    num.value = item
  }


    const onConfirm = ( {selectedOptions}:any ) => {
      showPicker.value = false;
      dataList.rarity = selectedOptions[0].value 
    };

    const onConfirm1 = ( {selectedOptions}:any ) => {
      showPicker1.value = false;
      dataList.cost = selectedOptions[0].value 
    };

    const onConfirm2 = ( {selectedOptions}:any ) => {
      showPicker2.value = false;
      dataList.card_type = selectedOptions[0].value 
    };
    const onConfirm3 = ( {selectedOptions}:any ) => {
      showPicker3.value = false;
      dataList.attack = selectedOptions[0].value 
    };
    const onConfirm4 = ( {selectedOptions}:any ) => {
      showPicker4.value = false;
      dataList.health = selectedOptions[0].value
    };
    const onConfirm5 = ( {selectedOptions}:any ) => {
      showPicker5.value = false;;
      dataList.durability = selectedOptions[0].value
    };
    const onConfirm6 = ( {selectedOptions}:any ) => {
      showPicker6.value = false;
      dataList.race = selectedOptions[0].value
    };

    const cardClass = (data:string) =>{
      console.log(data)
      dataList.card_class = data.toString()
    }

    const creat = async()=>{
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
      showSuccessToast('创建成功！')
      
    }
    const Preview = async()=>{
      senList.data =JSON.stringify(dataList)
      senList.is_preview = 1
      showCenter.value = true
      if(!senList.card_name||!dataList.card_class||!dataList.rarity||!dataList.cost||!dataList.card_type){
        showFailToast('请将标注●的属性写完全哦')
        return
      }
      const [error, data] = await awaitWrap(cardFrameCreatApi(senList));
      if (error || !data) {
        return;
      }
      Object.assign(PreviewList,data)
    }
</script>

<style scoped lang="less">
.about{
  width: 100%;
  background-color: #11151B;
  --van-popup-background:1;
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
        width: 200px;
        margin-right: 520px;
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
        width: 150px;
        margin-right: 520px;
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
        left: 140px;
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
        width: 110px;
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
        width: 110px;
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
        left: 90px;
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
          margin-right: 110px;
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
      li:nth-child(1),li:nth-child(4){
        margin-left: 0;
      }
      li:nth-child(1),li:nth-child(2),li:nth-child(3){
          p::before{
          width: 10px;
          height: 10px;
          border-radius: 100px;
          content: '';
          display: block;
          background-color: red;
          position: relative;
          top: 22px;
          left: 100px;
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
  }

</style>