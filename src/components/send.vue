<template>
  <div class="about">
    <div class="show" v-if="show">
        <div class="wrapper" @click.stop>
          <div class="block">
            <p>发布标题</p>
            <p @click="hide" class="x">x</p>
            <van-cell-group inset>
            <van-field
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入发布标题"
              show-word-limit
            />
          </van-cell-group>
          <van-button type="primary">确认</van-button>
          </div>
        </div>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
  import {ref,defineProps} from 'vue'
  const show = ref(true)
  const message = ref('')
  const hide = ()=>{
    if(show.value === false){
      show.value = true
    }else{
      show.value = false
    } 
  }
</script>
 
<style scoped lang="less">
  .show{
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: red;
      top: 0;
      left: 0;
    }

    .block {
      width: 90%;
      height:520px;
      background:rgb(40, 180, 197);
      border-radius: 50px;
      .x{
        position: absolute;
        font-size: 45px;
        right: 105px;
        top: 530px;
      }
    }
  
  }

</style>
 