<template>
  <div v-loading="loading">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loading:true
    };
  },
  created(){
    //获取当前是否已经登录
    this.$request({
      url:'/Login/AccessLogin'
    })
      .then(reponse=>{
        //保存令牌
        this.$store.commit('user/setRsid',reponse);
      })
      .finally(()=>{
        //取消loading
        this.loading = false
      })

  }
};
</script>

<style lang="less" scoped>

</style>