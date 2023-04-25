<template>
  <div class="about">
      <back :msg=msg></back>
      <div class="inner">
        <van-tabs v-model:active="activeName" >
          <van-tab :title="'素材库'+totalList.pic_list_qty" name="a" class="abc">
            <ArtBook1 :qty="totalList.pic_list_qty" @resetQty="resetQty"></ArtBook1>
          </van-tab>

          <van-tab :title="'卡牌草稿箱'+totalList.card_list_draft_qty" name="b" class="abc">
            <ArtBook2 @resetdraftQty="resetdraftQty"></ArtBook2>
          </van-tab>

          <van-tab :title="'已发布'+totalList.card_list_publish_qty" name="c"  class="abc">
            <ArtBook3 @resetPubQty="resetPubQty"></ArtBook3>
          </van-tab>
        </van-tabs>
      </div>
</div>
</template>

<script lang="ts" setup>
  import {reactive,ref,defineProps} from 'vue'
  import { showConfirmDialog ,showNotify  } from 'vant';
  import { awaitWrap } from '@/utils/index';
  import type { myArtCollectionTotalList , MyListItem} from '@/api/model/homeModel';
  import { myArtCollectionTotalApi , picMyListApi , picDeleteApi} from '@/api/home'
  import back from '@/components/back.vue'
  import ArtBook1 from '@/components/ArtBook1.vue'
  import ArtBook2 from '@/components/ArtBook2.vue'
  import ArtBook3 from '@/components/ArtBook3.vue'
  
  const msg = ref('我的画集')
  const activeName = ref('a');
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
    Object.assign(totalList,data)
  }
   getAllList()

   const resetQty = () =>{
    getAllList()
   }
   const resetPubQty = () =>{
    getAllList()
   }
   const resetdraftQty = () =>{
    getAllList()
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
  width: 100%;
  margin-top: 90px;
  --van-tab-text-color:rgb(55, 245, 179);
  --van-tabs-nav-background:#11151B;
  --van-tab-active-text-color:rgb(55, 245, 179);
  --van-tabs-bottom-bar-color:rgb(55, 245, 179);
  .abc{
    margin-top: 30px;
  }
}
</style>