<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>-->
  <div class="body">
    <div class="header">
      <div class="header-left">
        <div class="logo">
          <img src="@/assets/img/logo.png" alt srcset>
        </div>
        <router-link
          @click.native="topLink(index)"
          class="button"
          :class="{'button-select':(routeName==item.code)}"
          :to="item.to"
          v-for="(item,index) in topList"
          :key="index"
        >
          <img :src="item.img" alt>
          {{item.name}}
        </router-link>
      </div>
      <div class="header-right"></div>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "App",
  data() {
    return {
      //当前权重顶部栏
      selectIndex: 0,
      //顶部栏列表
      topList: [
        {
          code:'A01',
          name: "数据分析",
          img: require("@/assets/icon/sj.svg"),
          to: "/dataAnalysis/index",
        },
        {
          code:'A02',
          name: "小程序管理",
          img: require("@/assets/icon/xcxgl.svg"),
          to: "/wxMinManage/boutique"
        },
        {
          code:'A03',
          name: "后台管理",
          img: require("@/assets/icon/htgl.svg"),
          to: ""
        }
      ]
    };
  },
  computed:{
    /**
     * 用来定位顶部按钮的
     */
    routeName(){
      if(this.$route.name){
        return this.$route.matched[0].meta.code
      }else{
        return null;
      }
    }
  },
  mounted() {
  },
  methods: {
    topLink(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./main.less");
.body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  height: @app-header-height;
  background-image: linear-gradient(-30deg, #00c6fb 0%, #005bea 100%);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  .header-left {
    display: flex;
    align-items: stretch;
    > div,
    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > .button {
      width: 120px;
      transition: 0.2s;
      color: white;
      font-size: 15px;
      user-select: none;
      cursor: pointer;
      > img {
        width: 20px;
        margin-right: 5px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .button-select {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .logo {
      width: 180px;
      > img {
        width: 80%;
      }
    }
  }
}
.main {
  flex-grow: 1;
  overflow: auto;
  height: ~'calc( 100vh - @{app-header-height} )';
}
</style>