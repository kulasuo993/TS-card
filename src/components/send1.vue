<template>
  <div class="about">
    <div class="show">
      <van-popup 
        v-model:show="props.isShow" 
        closeable 
        round 
        @click-close-icon="hide"
        :style="{ padding: '64px' ,background:'rgb(40, 180, 197)'}" 
      >
        <p>发布标题</p>
        <van-cell-group inset class="input">
        <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            clearable
            maxlength="50"
            placeholder="请输入发布标题"
            show-word-limit
            
        />
        </van-cell-group>
        <van-button @click="send" type="primary" class="btn">确认</van-button>
      </van-popup>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
  import {ref,reactive,defineProps,defineEmits} from 'vue'
  import { awaitWrap } from '@/utils/index';
  import type { codeList ,userInfo ,picCreat} from '@/api/model/homeModel';
  import { showSuccessToast, showFailToast } from 'vant';
  import {CardPublishApi } from '@/api/home';

  const props = defineProps(['isShow','id'])
  const emits = defineEmits(['showPop'])
  
  
  const message = ref('')
  const hide = ()=>{
    emits('showPop',false)
    message.value = ''
  }
  const send = async() =>{
    if(message.value === ''){
      showFailToast('请输入描述');
     return
    }
    const queryState = reactive({ card_id: props.id,title:message.value });
    const [error, data] = await awaitWrap(CardPublishApi(queryState));
    console.log(data)
    if (error || !data) {
        return;
    }
    showSuccessToast('发布成功');
    emits('showPop',false)
    message.value = ''
  }
</script>
 
<style scoped lang="less">
  .show{
    p{
      display: block;
      margin-top: -100px;
      font-size: 35px;
      color: black;
    }
    .input{
      position: relative;
      top: 20px;
      right: 100px;
      width: 600px;;
      background-color: white;
    }
    .btn{
      position: relative;
      top: 80px;
      width: 200px;
      background: rgb(55, 245, 179);
      font-size: 32px;
    }
  }

</style>
 