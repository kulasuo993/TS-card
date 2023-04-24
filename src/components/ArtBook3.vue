<template>
  <div class="about">
    <div class="inner">
      <van-pull-refresh
        v-model="isLoading1"
        success-text="刷新成功"
        @refresh="getAllList"
      >
      <p class="CardDraft" v-show="showPop1">该类目下暂无作品~</p>
      <van-list
        v-model:loading="listLoading1"
        :finished="listFinished1"
        finishedText='没有更多了哦~'
        success-text="刷新成功"
      >
        <ul class="list2" >
          <li v-for="(item,index) in GetSelfList" :key="index" @click="showMore(item.card_id)">
            <van-image fit="contain" :src="item.img" class="pic" />
            <p class="title">{{ item.title }}</p>
            <p class="card_name">名称：<span>{{ item.card_name }}</span></p>
            <p class="words">关键词：<span>{{ item.words }}</span> </p>
            <p class="name">{{ formatTimestamp(item.created_at) }}</p>
          </li>
        </ul>
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
  import {reactive,ref } from 'vue'
  import { showConfirmDialog ,showNotify  } from 'vant';
  import { awaitWrap } from '@/utils/index';
  import type { myArtCollectionTotalList  ,SelfListItem} from '@/api/model/homeModel';
  import { myArtCollectionTotalApi , carSelfListApi ,} from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const totalList:myArtCollectionTotalList = reactive({
    pic_list_qty :1,
    card_list_draft_qty:1,
    card_list_publish_qty:1
  })
  const getAllList = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(myArtCollectionTotalApi(queryState));
    if (error || !data) {
        return;
    }
    isLoading1.value = false;
    listFinished1.value = false;
    Object.assign(totalList,data)
    getSelfList(true)
  }
   getAllList()

  const listLoading1 = ref(false); // 是否处于加载状态 默认不处于
  const listFinished1 = ref(false); // 是否全部数据加载完成
  const isLoading1 = ref(false);
  const showPop1 = ref(true)
  const GetSelfList = reactive<SelfListItem[]>([])
  const getSelfList = async (isRefresh: boolean) => {
    GetSelfList.length = 0
    const queryState = reactive({ card_status : 2 ,page: 1, page_size: totalList.card_list_publish_qty });
    if (isRefresh) {
      listLoading1.value = true;
    }

    const [error, data] = await awaitWrap(carSelfListApi(queryState));
    if (error || !data) {
      return;
    }
    if (queryState.page === 1) {
      isLoading1.value = false;
      listFinished1.value = false;
    }
    GetSelfList.push(...data.rows)
    showPop1.value = false
    if (GetSelfList.length === totalList.card_list_publish_qty) {
      listFinished1.value = true;
      return;
    }
  };

  const showMore = function(id:number){ 
   router.push({
    name:'about',
    params:{
      id:id
    }
   })
  }
</script>
 
<style scoped lang="less">
.inner{
    .title{
      width: 100%;
      height: 100px;
    }
  .list2{
    li{
      width: 100%;
      height: 380px;
      border-top: 1px dotted  white;
    }
    li:first-child{
      border-top: 1px  white;
    }
    .pic{
        width: 304px;
        height: 304px;
        margin-left: -550px;
        margin-top: 30px;
      }
      .title{
        width: 300px;
        display: block;
        font-size: 32px;
        color: white;
        position: relative;
        top: -320px;
        left: 230px;
        text-align: left;
      }
      .card_name{
        display: block;
        font-size: 22px;
        color: #5F7B93;
        position: relative;
        top: -350px;
        right: 70px;
        span{
          color: rgb(165, 191, 230);
        }
      }
      .words{
        text-align: left;
        width: 400px;
        display: block;
        font-size: 22px;
        color: #5F7B93;
        position: relative;
        top: -340px;
        left: 230px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        span{
          color: rgb(165, 191, 230);
        }
      }
      .name{
        display: block;
        font-size: 22px;
        color: #5F7B93;
        position: relative;
        top: -250px;
        right: 50px;
      }
  }
  .CardDraft{
    font-size: 35px;
    color: rgb(55, 245, 179);
    background-color: #11151B;
    width: 100%;
    height: 1550px;
  }
}
</style>