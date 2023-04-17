<template>
  <!-- <div class="upload-area">
    <van-uploader :after-read="afterRead">
      <van-button type="primary">上传</van-button>
    </van-uploader>
  </div> -->
  <router-link to="/">首页|</router-link>
  <router-link to="/about">关于</router-link>
  <router-view />
</template>

<script  lang="ts">
  import { ref,defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'App',
    components: {}
  })

  // const afterRead = (file: any) => {
  //   // 此时可以自行将文件上传至服务器
  //   console.log(file);
  // };



</script>

<!-- <style scoped>
  .upload-area{
    width: 200px;
  }
</style> -->
