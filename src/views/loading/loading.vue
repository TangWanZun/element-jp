<template>
  <div class="register-body" :style="{'backgroundImage':'url('+bg+')'}">
      <div class="main">
        <div class="header">
          <!-- <img src="@/assets/logo.svg" alt="" srcset=""> -->
          <img src="@/assets/logo.png" alt="" srcset="">
          <span>小程序精品后台管理系统</span>
        </div>
        <div class="content">
          <div class="content-item">
            <el-input prefix-icon="el-icon-service" v-model="formData.inputUser" placeholder="请输入用户名"></el-input>
          </div>
          <div class="content-item">
            <el-input prefix-icon="el-icon-edit" :show-password="true" v-model="formData.inputPassword" placeholder="请输入密码"></el-input>
          </div>
          <div class="content-item content-item-flex">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <!-- <el-button type="text">忘记密码</el-button> -->
          </div>
          <div class="content-item">
            <el-button style="width:100%" type="primary" @click.native="submitBtn" :loading="submitLoading">登录</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data(){
    return{
      bg:require('@/assets/fz/registerBg.svg'),
      submitLoading:false,
      formData:{
        //用户名
        inputUser:this.$store.state.user.user.userName,
        //密码
        inputPassword:this.$store.state.user.user.password
      },
      //是否记住密码
      checked:this.$store.state.user.user.checked
    }
  },
  methods:{
    /**
     * 登录
     */
    submitBtn(){
      this.submitLoading = true;
      //提交信息
      this.$store.dispatch('user/userLoginAction',{
        userName:this.formData.inputUser,
        password:this.formData.inputPassword
      })
        .then(()=>{
            console.log(this.$store);
            // 判断是否勾选的记住密码
          if(this.checked){
            //是  ，保存用户名和密码
            this.$store.commit('user/setUser',{
              userName:this.formData.inputUser,
              password:this.formData.inputPassword,
              checked:this.checked
            })
          }else{
            //否用户名密码清空
            this.$store.commit('user/setUser',{
              userName:'',
              password:'',
              checked:this.checked
            })
          }
          this.$router.replace('/');
        })
        .finally(()=>{
          this.submitLoading = false;
        })
    }
  }
};
</script>

<style lang="less" scoped>
.register-body{
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
}
.main{
  .header{
    display: flex;
    align-items: center;
    >img{
      width: 50px;
      margin-right: 20px;
    }
    >span{
      font-size: 25px;
      font-weight: bold;
    }
  }
  .content{
    margin-top: 10vh;
    .content-item{
      margin-bottom: 30px;
    }
    .content-item-flex{
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>