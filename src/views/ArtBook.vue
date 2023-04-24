<template>
  <div class="about">
      <back :msg=msg></back>
      <div class="inner">
        <van-tabs v-model:active="activeName" >
          <van-tab title='素材库' name="a" class="abc">
            <ArtBook1></ArtBook1>
          </van-tab>

          <van-tab title="卡牌草稿箱" name="b" class="abc">
            <ArtBook2></ArtBook2>
          </van-tab>

          <van-tab title="已发布" name="c"  class="abc">
            <ArtBook3></ArtBook3>
          </van-tab>
        </van-tabs>
      </div>
</div>
</template>

<script lang="ts" setup>
  import {reactive,ref} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import back from '@/components/back.vue'
  import ArtBook1 from '@/components/ArtBook1.vue'
  import ArtBook2 from '@/components/ArtBook2.vue'
  import ArtBook3 from '@/components/ArtBook3.vue'
  
  const msg = ref('我的画集')
  const activeName = ref('a');
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