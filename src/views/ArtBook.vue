<template>
  <div class="about">
      <back :msg=msg></back>
      <div class="inner">
        <van-tabs v-model:active="activeName" >
          <van-tab title='素材库' name="a" class="abc">
            <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="getData"
              >
              <van-list
                  v-model:loading="listLoading"
                  :finished="listFinished"
                  finishedText='没有更多了哦~'
                >
                  <ul class="list" >
                    <li v-for="(item,index) in picMyList" :key="index" >
                      <van-image fit="contain" :src="item.img" class="pic" />
                      <p class="name">{{ formatTimestamp(item.created_at) }}</p>
                      <span class="tool"><van-icon name="delete-o"  @click="delCard(item.pic_id)"/></span>
                    </li>
                  </ul>
                </van-list>
              </van-pull-refresh>
          </van-tab>

          <van-tab title="卡牌草稿箱" name="b" class="abc">
            <p class="CardDraft" v-show="showPop">该类目下暂无作品~</p>
          </van-tab>

          <van-tab title="已发布" name="c"  class="abc">
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
                <li v-for="(item,index) in GetSelfList" :key="index" >
                  <van-image fit="contain" :src="item.img" class="pic" />
                  <p class="title">{{ item.title }}</p>
                  <p class="card_name">名称：<span>{{ item.card_name }}</span></p>
                  <p class="words">关键词：<span>{{ item.words }}</span> </p>
                  <p class="name">{{ formatTimestamp(item.created_at) }}</p>
                </li>
              </ul>
            </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
        
      </div>
     
 

</div>
</template>

<script lang="ts" setup>
  import {reactive,ref,onMounted,onBeforeUnmount} from 'vue'
  import { showConfirmDialog ,showNotify  } from 'vant';
  import { awaitWrap } from '@/utils/index';
  import type { myArtCollectionTotalList , MyListItem ,SelfListItem} from '@/api/model/homeModel';
  import { myArtCollectionTotalApi , picMyListApi , carSelfListApi , picDeleteApi} from '@/api/home';
  import {formatTimestamp} from '@/utils/filter'
  import back from '@/components/back.vue'
  
  const msg = ref('我的画集')
  const activeName = ref('a');
  const number = ref(0)
  const show = ref(false);
  const totalList:myArtCollectionTotalList = reactive({
    pic_list_qty :1,
    card_list_draft_qty:1,
    card_list_publish_qty:1
  })
  const change:any = (index:any)=>{
    number.value = index
  }
  const getAllList = async()=>{
    const queryState = reactive({batch_id :1});
    const [error, data] = await awaitWrap(myArtCollectionTotalApi(queryState));
    if (error || !data) {
        return;
    }
   
    isLoading1.value = false;
    listFinished1.value = false;
    
    Object.assign(totalList,data)
    console.log(totalList)
    getData(true) //自定义事件
    getSelfList(true)
  }
   getAllList()


  //  onMounted(() => {
  //   setTimeout(() => {
  //     //设置定时器
  //     getData(true) //自定义事件
  //     getSelfList(true)
  //   }, 1000);
  // });
  
   //第一页
  const listLoading = ref(false); // 是否处于加载状态 默认不处于
  const listFinished = ref(false); // 是否全部数据加载完成
  const isLoading = ref(false);
  const picMyList = reactive<MyListItem[]>([])
   
  const getData = async (isRefresh: boolean) => {
    picMyList.length = 0
    const queryState = reactive({ batch_id : 1 ,page: 1, page_size: totalList.pic_list_qty });
    if (isRefresh) {
      listLoading.value = true;
    }

    const [error, data] = await awaitWrap(picMyListApi(queryState));
    if (error || !data) {
      return;
    }
    if (queryState.page === 1) {
      isLoading.value = false;
      listFinished.value = false;
    }
    picMyList.push(...data.rows)
    listFinished.value = true;
    // if (picMyList.length === totalList.pic_list_qty) {
      
    //   return;
    // }
  };

  const delCard = async (id:number) =>{
    showConfirmDialog({
      title: '是否执行删除操作',
      message:
        '删除后将无法恢复哦',
      confirmButtonText:'确认删除',
      cancelButtonText:'我再想想'
    })
    .then(() => {
      delCard1(id)
      getData(true)
    })
    .catch(() => {
      showNotify({ type: 'primary', message: '取消删除' });
    })
    
  }
  const delCard1 = async (id:number) =>{
    const queryState = reactive({ batch_id : 1 ,pic_id: id });
    const [error, data] = await awaitWrap(picDeleteApi(queryState));
    showNotify({ type: 'primary', message: '删除成功' });
  }

  //第二页
  const showPop = ref(true)
  //第三页
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
</script>

<style scoped lang="less">
.newStyle{
    border-bottom: 5px solid rgb(55, 245, 179);
  }
.about{
  width: 100%;
  background-color: #11151B;
}
.inner{
  width: 100%;
  margin-top: 90px;
  --van-tab-text-color:rgb(55, 245, 179);
  --van-tabs-nav-background:#11151B;
  --van-tab-active-text-color:rgb(55, 245, 179);
  --van-tabs-bottom-bar-color:rgb(55, 245, 179);
    .abc{
     margin-top: 30px;
    }
    .title{
      width: 100%;
      height: 100px;
      .btn_anniu{
        float: left;
        width: 33%;
          p{
            font-size: 24px;
            color: rgb(55, 245, 179);
            padding-right: 50px;
          }
      }
    }
   
  .btn_anniu:nth-child(1){
    margin-left: -50px;
  }
  .btn_anniu:nth-child(2){
    margin-left: 50px;
  }
  .list{
    margin: 0 auto;
    margin-left: 40px;
    display: flex;
    justify-content:flex-start;
    flex-wrap: wrap;
    margin-top: -20px;
    li{
      width: 344px;
      height: 502px;
      text-align: center;
      border: 1px solid #ccc;
      margin-left: 20px;
      margin-top: 20px;
      .pic{
        width: 344px;
        height: 344px;
        margin: 14px auto 0px;
      }
     
      .name{
        font-size: 22px;
        color: #e8c382;
      }
      .tool{
        position: relative;
        width: 600px;
        height: 100px;
        color: rgb(55, 245, 179);
        right: 100px;
        top: 20px;
      }
    }
    li:nth-child(2n+1){
      margin-left: -20px;
    }
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
  .box{
    width: 100%;
    margin-right: 500px;
  }
}
</style>