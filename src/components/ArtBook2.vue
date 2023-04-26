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
            <p class="title">{{ item.card_name }}</p>
            <p class="name">{{ formatTimestamp(item.created_at) }}</p>
            <p class="icon">
              <van-icon @click="dltCard(item.card_id)" name="delete-o" class="icon1" />
              <van-icon @click="send(item.card_id)" name="guide-o" class="icon3"/>
            </p>
          
          </li>
        </ul>
      </van-list>
      </van-pull-refresh>
      <sendShow :isShow="show" @showPop="showPop" :id="id"></sendShow>
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
  import sendShow from '@/components/send1.vue'

  const emits = defineEmits(['resetPubQty'])
  const router = useRouter()
  const listLoading = ref(false); // 是否处于加载状态 默认不处于
  const listFinished = ref(false); // 是否全部数据加载完成
  const isLoading = ref(false);
  const showPop1 = ref(true)
  const picMyList = reactive<SelfListItem[]>([])

  const show = ref(false)
  const id = ref(1)
  const queryState = reactive({ card_status : 1 ,page: 1, page_size: 5});
  const getData = async (isRefresh: boolean) => {
    showPop1.value = false
    if (isRefresh) {
      queryState.page = 1;
      listLoading.value = true;
      picMyList.length = 0
    }

    const [error, data] = await awaitWrap(carSelfListApi(queryState));
    console.log(data)
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
  getData(true)
  const showMore = function(id:number){ 
   router.push({
    name:'about',
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
  const send = (item:number) =>{
      show.value = !show.value
      id.value = item
      emits('resetPubQty')
  }
  const showPop = (data:boolean) =>{
    show.value = data
  }
</script>
 
<style scoped lang="less">
.inner{
  .list2{
    width: 95%;
    height: 1400px;
    margin-left: 15px;
    margin-top: -30px;
    li{
      width: 30%;
      height: 500px;
      background-color: rgb(54, 72, 88);
      border-radius: 10px;
      float: left;
      margin-left:20px;
      margin-top: 30px;
      .title{
          color: white;
          font-size: 20px;
          display: block;
          margin-right: 155px;
        }
      .name{
        font-size: 1px;
        color: rgb(165, 191, 230);
        display: block;
        margin-top: 30px;
    
      }
      .icon{
        color: rgb(165, 191, 230);
        position: relative;
        right: 30px;
        top: 10px;
        color: rgb(55, 245, 179);
        .icon1{
          margin-left: 50px;
        }
        .icon3{
          margin-left: 100px;
        }
        span{
          font-size: 5px;
          margin-left: 5px;
        }
       
      }
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