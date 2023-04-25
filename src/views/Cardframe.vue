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
            <van-field v-model="name" clearable  placeholder="卡牌名称" />
          </van-cell-group>
        </div>

        <div class="three">
          <p>效果</p>
          <van-cell-group class="input" >
            <van-field
              v-model="rule"
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
                
              />
            </li>
          </ul>
        </div>

        <van-cell is-link title="基础用法" @click="show = true" />
        <van-action-sheet v-model:show="show" :actions="abc" @select="onSelect" />
      </div>
     
 

  </div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { cardFrameHistoryListItem , cardFrameHistoryList } from '@/api/model/homeModel';
  import { cardFrameHistoryApi  } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'
  import stoneList from '@/settings/propertiesSetting'
  import { showToast } from 'vant';

  console.log(stoneList.hearthstone.fixed_attr[0].options.values)
  const abc = reactive<[]>([])
  // abc.push(...stoneList.hearthstone.fixed_attr[0].options)
  const msg = ref('我是牌框')
  const list = reactive<cardFrameHistoryListItem[]>([])
  const count = ref(0)
  const num = ref(0)
  const name = ref('')
  const rule = ref('')
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
    name.value = item.card_name
    rule.value = item.card_rule
  }

  const changeCareer = (item:number)=>{
    num.value = item
  }

  const show = ref(false);
    const actions = [
      { name: '选项一' },
      { name: '选项二' },
      { name: '选项三' },
    ];
    const onSelect = (item:any) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      show.value = false;
      showToast(item.name);
    };
</script>

<style scoped lang="less">
.about{
  width: 100%;
  height: 100%;
  background-color: #11151B;
  --van-field-input-color:#364858;
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
    
  }
}


</style>