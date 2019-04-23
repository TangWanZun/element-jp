<template>
  <div>
    <div class="body">
      <el-card>
        <div slot="header" class="clearfix">
          <el-button
            icon="el-icon-plus"
            style="padding:10px 15px"
            type="primary"
            @click="cartypeModalShow"
          >添加新车型</el-button>
        </div>
        <div class="list">
          <el-card
            :body-style="{padding:'0px',height: '150px'}"
            class="item"
            shadow="hover"
            v-for="item in 7"
            :key="item"
          >
            <div class="item-box" :style="{'backgroundImage':'url('+itemBg+')'}">
              <div class="item-header" @click="push">
                <div>A系</div>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div class="item-setup">
                <i class="el-icon-delete" @click.stop="deleteBtn" style="margin-right:10px"></i>
                <i class="el-icon-setting" @click.stop="cartypeModalShow"></i>
              </div>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
    <!-- 设置与添加车型 -->
    <cartypeModal ref="cartypeModalRef"></cartypeModal>
  </div>
</template>

<script>
import cartypeModal from "./cartypeModal";
export default {
  name: "cartype",
  components: {
    cartypeModal
  },
  data() {
    return {
      itemBg: require("@/assets/fz/Axc.jpg"),
      //是否显示车型样式
      dialogVisible: false
    };
  },
  methods: {
    /**
     * 点击传递
     */
    push() {
      this.$router.push("/wxMinManage/classify");
    },
    /**
     * 点击打开车型编辑
     */
    cartypeModalShow() {
      this.$refs.cartypeModalRef.show();
    },
    /**
     * 删除车型
     */
    deleteBtn() {
      this.$confirm("此操作将永久删除该车型?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  padding: 15px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 300px;
  margin-right: 15px;
  margin-bottom: 15px;
  .item-box {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    padding-top: 15px;
    position: relative;
    .item-header {
      display: flex;
      justify-content: space-between;
      padding: 5px 15px;
      position: relative;
      font-size: 15px;
      color: white;
      cursor: pointer;
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: #3b76d8;
      }
    }
    .item-setup {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 25px;
      color: white;
      cursor: pointer;
      > i {
        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
}
//打开创建车系
.dialog-body {
  //上传文件
  .dialog-update {
    display: flex;
    justify-content: space-between;
    > div {
      &:first-child {
        margin-right: 20px;
      }
      &:last-child {
        flex-grow: 1;
        color: rgba(0, 0, 0, 0.5);
        > span {
          display: block;
        }
      }
    }
  }
  //车型名称
  .dialog-name {
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>