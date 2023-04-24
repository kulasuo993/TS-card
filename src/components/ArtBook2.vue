<template>
  <div class="abc">
    <div class="inner">
      <p class="CardDraft" v-show="showPop">该类目下暂无作品~</p>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
  import {reactive,ref,defineProps} from 'vue'
  import { showConfirmDialog ,showNotify  } from 'vant';
  import { awaitWrap } from '@/utils/index';
  import type { myArtCollectionTotalList , MyListItem} from '@/api/model/homeModel';
  import { myArtCollectionTotalApi , picMyListApi , picDeleteApi} from '@/api/home';

  const showPop = ref(true)
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
    console.log(totalList)
  }
   getAllList()

</script>
 
<style scoped lang="less">

.inner{
  margin-top: 10px;
  .CardDraft{
    font-size: 35px;
    color: rgb(55, 245, 179);
    background-color: #11151B;
    width: 100%;
    height: 1550px;
  }
}
</style>
 