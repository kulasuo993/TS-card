<template>
  <div class="about">
    <div class="inner">
      <p class="CardDraft" v-show="showPop1">该类目下暂无作品~</p>
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="getData(true)"
      >
        <van-list
          v-model:loading="listLoading"
          :finished="listFinished"
          finishedText='没有更多了哦~'
          @load="getData"
          offset="100"
        >
        <ul class="list2" >
          <li v-for="(item,index) in picMyList" :key="index">
            <van-image @click="showMore(item.card_id)" fit="contain" :src="item.img" class="pic" />
            <p class="title">{{ item.title }}</p>
            <p class="card_name">名称：<span>{{ item.card_name }}</span></p>
            <p class="words">关键词：<span>{{ item.words }}</span> </p>
            <p class="name">{{ formatTimestamp(item.created_at) }}</p>
            <p class="icon">
              <van-icon @click="dltCard(item.card_id)" name="delete-o" class="icon3" />
              <van-icon name="fire-o" class="icon3"/>
              <span>{{ item.likes_number }}</span>
            </p>
          
          </li>
        </ul>
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
  import {reactive,ref,defineEmits} from 'vue'
  import { showConfirmDialog ,showNotify  } from 'vant';
  import { awaitWrap } from '@/utils/index';
  import type { myArtCollectionTotalList  ,SelfListItem} from '@/api/model/homeModel';
  import { myArtCollectionTotalApi , carSelfListApi , CardDeleteApi } from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import { useRouter } from 'vue-router'

  const emits = defineEmits(['resetPubQty'])
  const router = useRouter()
  const listLoading = ref(false); // 是否处于加载状态 默认不处于
  const listFinished = ref(false); // 是否全部数据加载完成
  const isLoading = ref(false);
  const showPop1 = ref(true)
  const picMyList = reactive<SelfListItem[]>([])
  const queryState = reactive({ card_status : 2 ,page: 1, page_size: 5});
  const getData = async (isRefresh: boolean) => {
    showPop1.value = false
    if (isRefresh) {
      queryState.page = 1;
      listLoading.value = true;
      picMyList.length = 0
    }

    const [error, data] = await awaitWrap(carSelfListApi(queryState));
    if (error || !data) {
      return;
    }
    if (!data.rows.length) {
      listFinished.value = true;
      return;
    }
    if (queryState.page === 1) {
      isLoading.value = false;
      listFinished.value = false;
    }
    picMyList.push(...data.rows)
    listLoading.value = false;
    queryState.page += 1;
  };
  const showMore = function(id:number){ 
   router.push({
    name:'aboutpic',
    params:{
      id:id
    }
   })
  }
  const dltCard = async (id:number) =>{
    showConfirmDialog({
      title: '是否执行删除操作',
      message:
        '删除后将无法恢复哦',
      confirmButtonText:'确认删除',
      cancelButtonText:'我再想想'
    })
    .then(() => {
      dltCard1(id)
      getData(true)
      emits('resetPubQty')
    })
    .catch(() => {
      showNotify({ type: 'primary', message: '取消删除' });
    })
    
  }
  const dltCard1 = async(id:number) =>{
   
    const queryState = reactive({ card_id : id });
    const [error, data] = await awaitWrap(CardDeleteApi(queryState));
    showNotify({ type: 'primary', message: '删除成功' });
  }
</script>
 
<style scoped lang="less">
.inner{
    .title{
      width: 100%;
      height: 100px;
    }
  .list2{
    width: 95%;
    padding: 0 30px 0;
    li{
      width: 100%;
      height: 320px;
      border-top: 1px dotted  white;
      .icon{
        color: rgb(165, 191, 230);
        position: relative;
        top: -285px;
        left: 280px;
        .icon3{
          margin-left: 20px;
        }
        span{
          font-size: 5px;
          margin-left: 5px;
        }
      }
    }
    li:first-child{
      border-top: 1px  white;
    }
    .pic{
        width: 200px;
        height: 250px;
        background-size: 100%;
        overflow: hidden;
        margin-left: -400px;
        margin-top: 20px;
      }
      .title{
        width: 300px;
        display: block;
        font-size: 32px;
        color: white;
        margin-top: 10px;
        position: relative;
        top: -280px;
        left: 265px;
        text-align: left;
      }
      .card_name{
        width: 300px;
        display: block;
        font-size: 22px;
        color: #5F7B93;
        position: relative;
        top: -330px;
        right: -265px;
        text-align: left;
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
        top: -320px;
        left: 265px;
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
        top: -245px;
        right: -40px;
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