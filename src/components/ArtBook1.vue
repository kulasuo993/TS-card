<template>
  <div class="about">
    <div class="inner">
      <p class="CardDraft" v-show="showPop2">该类目下暂无作品~</p>
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
          <ul class="list" >
            <li v-for="(item,index) in picMyList" :key="index">
              <van-image  @click="showMore(item.pic_id)" fit="contain" :src="item.img" class="pic" />
              <p class="name">{{ formatTimestamp(item.created_at) }}</p>
              <span class="tool">
                <van-icon name="delete-o"  @click="delCard(item.pic_id)"/>
                <span>+加牌框</span>
                <van-icon @click="send(item.pic_id)" name="guide-o" class="icon3" />
              </span>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <sendShow :isShow="show" @showPop="showPop" :id="id"></sendShow>
    </div>

  </div>
</template>
 
<script lang="ts" setup>
  import {reactive,ref,defineProps,defineEmits} from 'vue'
  import { showConfirmDialog ,showNotify  } from 'vant';
  import { awaitWrap } from '@/utils/index';
  import type { MyListItem} from '@/api/model/homeModel';
  import { picMyListApi , picDeleteApi} from '@/api/home';
  import {formatTimestamp} from '@/utils/filter' 
  import { useRouter } from 'vue-router'
  import sendShow from '@/components/send.vue'

  const show = ref(false)
  const props = defineProps(['qty'])
  const emits = defineEmits(['resetQty'])
  const router = useRouter()
  const listLoading = ref(false); // 是否处于加载状态 默认不处于
  const listFinished = ref(false); // 是否全部数据加载完成
  const isLoading = ref(false);
  const picMyList = reactive<MyListItem[]>([])
  const showPop2 = ref(true)
  const id = ref(1)
  const queryState = reactive({ batch_id : 1 ,page: 1, page_size: 5 });
  const getData = async (isRefresh: boolean) => {
    showPop2.value = false
    if (isRefresh) {
      queryState.page = 1;
      listLoading.value = true;
      picMyList.length = 0
    }

    const [error, data] = await awaitWrap(picMyListApi(queryState));
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
    emits('resetQty')
    const queryState = reactive({ batch_id : 1 ,pic_id: id });
    const [error, data] = await awaitWrap(picDeleteApi(queryState));
    showNotify({ type: 'primary', message: '删除成功' });
  }

  const showMore = function (id:number){
    router.push({
    name:'CardAbout',
    params:{
      id:id
    }
   })
  }

  const send = (item:number) =>{
      show.value = !show.value
      id.value = item
      emits('resetQty')
  }

  const showPop = (data:boolean) =>{
    show.value = data
  }
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
  margin-top: 10px;
  .CardDraft{
    font-size: 35px;
    color: rgb(55, 245, 179);
    background-color: #11151B;
    width: 100%;
    height: 1550px;
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
        span{
          position: absolute;
          width: 110px;
          height: 30px;
          border: 1px solid rgb(55, 245, 179);
          border-radius: 50px;
          font-size: 5px;
          line-height: 24px;
          top: 6px;
          left: 50px;
        }
        .icon3{
           position: absolute;
           top: 6px;
           left: 180px;
        }
      }
    }
    li:nth-child(2n+1){
      margin-left: -20px;
    }
  }
}
</style>
 