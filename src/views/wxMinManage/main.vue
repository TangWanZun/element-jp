<template>
  <div class="page-body">
    <div class="menu">
      <el-menu  
        class="el-menu-vertical-demo"
        :router="true"
        :default-active="defaultActive"
        background-color="#001529"
        text-color="#8a8a8a"
        >
        <el-menu-item index="/wxMinManage/cartype">
          <i class="el-icon-menu"></i>
          <span slot="title">车型定义</span>
        </el-menu-item>
        <el-menu-item index="/wxMinManage/boutique" >
          <i class="el-icon-goods"></i>
          <span slot="title">精品定义</span>
        </el-menu-item>
        <el-menu-item index="/wxMinManage/distributor" >
          <i class="el-icon-document"></i>
          <span slot="title">经销商管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <router-view/>
    </div>
    <!-- <div>
      <router-link to="/wxMinManage/boutique">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>
<script>
export default {
  name:'wxMinManage',
  computed:{
    defaultActive(){
      return this.$route.fullPath
    }
  },
}
</script>
<style lang="less" scoped>
@import url('../../main.less');
.page-body{
  display: flex;
  align-items: stretch;
  min-height: ~'calc( 100vh - @{app-header-height} )';
}
.menu{
  width: 250px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  background-color:#001529;
  flex-shrink: 0;
}
.main{
  flex-grow:1;
  height: ~'calc( 100vh - @{app-header-height} )';
  width: ~'calc( 100vw - 170px )';
  overflow: auto;
}
</style>