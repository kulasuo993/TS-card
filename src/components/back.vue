<template>
  <div class="abc">
    <van-nav-bar
        :title= msg
        left-arrow
        @click-left="onClickLeft"
      fixed
      />
  </div>
</template>
 
<script lang="ts" setup>
  import {ref,defineProps} from 'vue'
  const onClickLeft = () => history.back();
  const props = defineProps(['msg'])
</script>
 
<style scoped>
.abc{
  --van-nav-bar-background:black;
  --van-nav-bar-title-text-color:white;
  --van-nav-bar-icon-color:white
}
  /* .back{
    width: 7px;
    height: 12px;
    color: #FFFFFF;
    position: relative;
    top: 50px;
    right: 330px;
    opacity: 1;
  } */
</style>
 