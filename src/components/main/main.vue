<template>
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
      <div class="header-right">
        <!-- 添加右侧头像 -->
        <el-dropdown @command="handleCommand" style="height:100%" placement="bottom-start">
          <div class="user">
            <div class="user-img">
              <img src="@/assets/icon/admin.svg" alt srcset>
            </div>
            <div class="user-name">admin</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="A01">更改密码</el-dropdown-item>
            <el-dropdown-item command="A02" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 添加右侧的头像 -->
        <!-- <el-popover placement="bottom-end" width="400" trigger="hover">
          <el-table :data="gridData">
            <el-table-column width="150" property="date" label="日期"></el-table-column>
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
            <el-table-column width="300" property="address" label="地址"></el-table-column>
          </el-table>
          <template slot="reference">
            <div class="user">
              <div class="user-img">
                <img src="@/assets/icon/admin.svg" alt srcset>
              </div>
              <div class="user-name">admin</div>
            </div>
          </template>
        </el-popover>-->
      </div>
    </div>
    <div class="main">
      <router-view/>
    </div>
    <!-- 修改密码 -->
    <changePassword ref="changePasswordRef"></changePassword>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import changePassword from "./components/changePassword"
export default {
  name: "App",
  components:{
    changePassword
  },
  data() {
    return {
      //当前权重顶部栏
      selectIndex: 0,
      //顶部栏列表
      topList: [
        // {
        //   code:'A01',
        //   name: "数据分析",
        //   img: require("@/assets/icon/sj.svg"),
        //   to: "/dataAnalysis/index",
        // },
        {
          code: "A02",
          name: "主数据管理",
          img: require("@/assets/icon/xcxgl.svg"),
          to: "/wxMinManage/distributor"
        },
        // {
        //   code: "A03",
        //   name: "系统设置",
        //   img: require("@/assets/icon/htgl.svg"),
        //   to: "/systemSetup/index"
        // }
      ]
    };
  },
  computed: {
    /**
     * 用来定位顶部按钮的
     */
    routeName() {
      if (this.$route.name) {
        return this.$route.matched[1].meta.code;
      } else {
        return null;
      }
    }
  },
  methods: {
    topLink(index) {
      this.selectIndex = index;
    },
    /**
     * 点击右侧头像
     */
    handleCommand(data) {
      switch (data) {
        //更改密码
        case "A01": {
          this.changePassword()
          break;
        }
        //退出当前用户
        case "A02": {
          this.exitUser();
          break;
        }
      }
    },
    /**
     * 更改密码
     */
    changePassword(){
      this.$refs.changePasswordRef.show();
    },
    /**
     * 退出账号
     */
    exitUser() {
      this.$confirm("是否退出当前账号？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出当前账号!"
          });
          //运行退出
          this.$store.dispatch('user/userLoginOut');
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../main.less");
.body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  height: @app-header-height;
  // background-image: linear-gradient(-30deg, #00c6fb 0%, #005bea 100%);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
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
      color: black;
      font-size: 14px;
      user-select: none;
      cursor: pointer;
      > img {
        width: 20px;
        margin-right: 5px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        // color: #409EFF;
      }
    }
    .button-select {
      color: #409eff;
      border-bottom: 2px solid #409eff;
      > img {
        filter: invert(55%) sepia(33%) saturate(3146%) hue-rotate(188deg)
          brightness(100%) contrast(101%);
      }
    }
    .logo {
      width: 250px;
      background-color: #002140;
      > img {
        width: 60%;
        height: 70%;
      }
    }
  }
  .header-right {
    .user {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 20px;
      user-select: none;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      //头像
      .user-img {
        overflow: hidden;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-right: 10px;
        > img {
          width: 100%;
        }
      }
      //名称
      .user-name {
        font-size: 14px;
      }
    }
  }
}
.main {
  flex-grow: 1;
  overflow: auto;
  height: ~"calc( 100vh - @{app-header-height} )";
}
</style>