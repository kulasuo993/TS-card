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
        <button @click="abc">123</button>
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
            <li v-for="(item,index) in stoneList.hearthstone.card_class" @click="changeCareer(index+1)" :class="{on1:num === index+1}">
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
                v-model="rarityVal" 
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
                v-model="costVal" 
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
                v-model="typeVal" 
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
            <li v-if="typeVal === '生物'||typeVal === '武器'">
              <p>攻击力</p>
              <input type="text" 
                v-model="attackVal" 
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

            <li v-if="typeVal === '生物'">
              <p>生命值</p>
              <input type="text" 
                v-model="healthVal" 
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
            <li v-if="typeVal === '武器'||typeVal === '英雄'">
              <p>耐久度</p>
              <input type="text" 
                v-model="durabilityVal" 
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
            <li v-if="typeVal === '生物'">
              <p>随从类型</p>
              <input type="text" 
                v-model="racehVal" 
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
     
        
      </div>
     
 

  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { cardFrameHistoryListItem , cardFrameCreatList } from '@/api/model/homeModel';
  import { cardFrameHistoryApi , cardFrameCreatApi } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'
  import stoneList from '@/settings/propertiesSetting'
  import { showToast } from 'vant';
import { stringify } from 'querystring';
  const dataList:cardFrameCreatList = reactive({
    card_class:'',
    rarity:'',
    cost:'',
    card_type:'',
    attack:'',
    health:'',
    durability:'',
    race:'',
  })
  const senList = reactive({
    batch_id:1,
    card_name:'',
    card_rule:'',
    data:{dataList},
    game_id:'hearthstone'
  })
  
  const rarityVal = ref('');
  const costVal = ref('');
  const typeVal = ref('');
  const attackVal = ref('')
  const healthVal = ref('')
  const durabilityVal = ref('')
  const racehVal = ref('')

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
  const num = ref(0)
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

  const ipt = (item:any,index:number)=>{
    count.value = index+1
    senList.card_name = item.card_name
    senList.card_rule = item.card_rule
  }

  const changeCareer = (item:number)=>{
    num.value = item
  }


    const onConfirm = ( {selectedOptions}:any ) => {
      showPicker.value = false;
      rarityVal.value = selectedOptions[0].value;
      dataList.rarity = rarityVal.value
    };

    const onConfirm1 = ( {selectedOptions}:any ) => {
      showPicker1.value = false;
      costVal.value = selectedOptions[0].value;
      dataList.cost = costVal.value
    };

    const onConfirm2 = ( {selectedOptions}:any ) => {
      showPicker2.value = false;
      typeVal.value = selectedOptions[0].text;
      dataList.card_type = selectedOptions[0].value
    };
    const onConfirm3 = ( {selectedOptions}:any ) => {
      showPicker3.value = false;
      attackVal.value = selectedOptions[0].text;
      dataList.attack = selectedOptions[0].value
    };
    const onConfirm4 = ( {selectedOptions}:any ) => {
      showPicker4.value = false;
      healthVal.value = selectedOptions[0].text;
      dataList.health = selectedOptions[0].value
    };
    const onConfirm5 = ( {selectedOptions}:any ) => {
      showPicker5.value = false;
      durabilityVal.value = selectedOptions[0].text;
      dataList.durability = selectedOptions[0].value
    };
    const onConfirm6 = ( {selectedOptions}:any ) => {
      showPicker6.value = false;
      racehVal.value = selectedOptions[0].text;
      dataList.race = selectedOptions[0].value
    };

    const cardClass = (data:string) =>{
      console.log(data)
      dataList.card_class = data
      // senList.data = stringify(dataList)
    }

    const abc = async()=>{
      // Object.assign(senList.data,dataList)
      console.log(senList)
      const [error, data] = await awaitWrap(cardFrameCreatApi(senList));
      if (error || !data) {
        return;
      }
      console.log(data)
    }
</script>
<style scoped lang="less">
// .van-field__control{
//   color: red;
// }
.about{
  width: 100%;
  height: 100%;
  background-color: #11151B;
  .title{
    height: 50px;
    margin-top:88px;
    background: rgb(123, 237, 228);
    color: #0f8a80;
    font-size: 20px;
  }
  .inner{
    width: 90%;
    height: 100%;
    margin-left: 40px;
    margin-top: 90px;
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
      height: 150px;
      margin-top: 50px;
      p{
        color: white;
        display: block;
        font-size: 28px;
        width: 150px;
        margin-right: 520px;
      }
      .input{
        position: relative;
        top: 10px;
      }
    }
    .three{
      width: 100%;
      height: 150px;
      margin-top: 50px;
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
      height: 150px;
      margin-top: 120px;
      p{
        color: white;
        display: block;
        font-size: 28px;
        width: 110px;
      }
      ul{
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
      height: 150px;
      margin-top: 120px;
      ul{
        width: 100%;
        li{
        width: 30%;
        margin-left: 20px;
        float: left;
        p{
          width: 100px;
          color: white;
          font-size: 25px;
          display: block;
          margin-right: 110px;
          margin-bottom: 20px;
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
      }
   
      
    }
   
  }
}

</style>