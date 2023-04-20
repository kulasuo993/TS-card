<template>
  <div>
    <van-icon name="arrow-left" @click="back" class="back"/>
  </div>
</template>
 
<script lang="ts" setup>
import { defineComponent } from "vue";
 
import { useRouter } from "vue-router";

 
    //router是全局路由对象
    let router = useRouter();
 
    let back = () => {
      router.back();
    };
 
</script>
 
<style scoped>
  .back{
    width: 7px;
    height: 12px;
    color: #FFFFFF;
    position: relative;
    top: 50px;
    right: 330px;
    opacity: 1;
  }
</style>
 