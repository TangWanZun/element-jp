<template>
  <div>
    <div class="body">
      <div class="body-header">A系车</div>
      <div class="body-content" v-loading="contentLoading">
        <div
          shadow="hover"
          :body-style="{padding:'0px'}"
          class="box-card"
          v-for="(item,key) in dataList"
          :key="key"
        >
          <!-- 头部 -->
          <div class="box-card-header">
            <span>{{item.name}}</span>
            <div style="float: right;">
              <el-dropdown @command="dropdownCommand">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-delete"
                    :command="{name:'delClass',key:key}"
                  >删除当前系列</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- 内容 -->
          <div class="box-card-content">
            <el-card
              v-for="(cardItem,cardIndex) in item.list"
              :key="cardIndex"
              class="card-item"
              :body-style="{padding:'0px'}"
              shadow="never"
            >
              <div class="card-item-in">
                <img :src="cardItem.img" alt srcset>
                <div>{{cardItem.name}}</div>
                <!-- 删除按钮 -->
                <div class="card-item-del" @click="delItemButton(key,cardIndex)">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </el-card>
            <div
              class="card-add-bu"
              :class="{'card-add-bu-absolute': item.list.length>3}"
              @click="cardAddButton"
            >
              <i class="el-icon-circle-plus-outline"></i>
              添加精品
            </div>
          </div>
        </div>
        <el-card class="box-card-add" shadow="hover" :class="{'box-card-add-show':isAddText}">
          <div class="box-card-add-text" v-if="!isAddText" @click="isAddText=true">新建精品系列</div>
          <div v-else>
            <div>
              <el-input v-model="classifyName" placeholder="请输入精品系列名称"></el-input>
            </div>
            <div class="box-card-add-footer">
              <el-button style="padding:8px 15px" type="text" @click="isAddText=false">取消</el-button>
              <el-button style="padding:8px 15px" type="primary" @click="classifySend">保存</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <classifyModal ref="classifyModal"></classifyModal>
  </div>
</template>

<script>
import classifyModal from "./classifyModal";
import { setTimeout } from "timers";
export default {
  name: "classify",
  components: {
    classifyModal
  },
  data() {
    return {
      //页面加载
      contentLoading: true,
      //新建精品是否启动
      isAddText: false,
      //获取精品系列
      dataList: [],
      //添加的精品系列名称
      classifyName: ""
    };
  },
  created() {
    //数据拉取
    this.getData();
  },
  methods: {
    /**
     * 获取数据
     */
    getData() {
      let list = [];
      for (let i = 0; i < 8; i++) {
        list.push({
          name: "奔驰专车专用隐藏式记录仪",
          img:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
        });
      }
      //虚拟数据
      this.dataList = [
        {
          id: 1,
          name: "记录仪",
          list: list
        },
        {
          id: 2,
          name: "喇叭",
          list: list.slice(0, 3)
        },
        {
          id: 3,
          name: "座椅",
          list: []
        }
      ];
      setTimeout(() => {
        this.contentLoading = false;
      }, 500);
    },
    /**
     * 添加精品
     */
    cardAddButton() {
      this.$refs.classifyModal.show();
    },
    /**
     * 点击更多项
     */
    dropdownCommand(obj) {
      switch (obj.name) {
        //点击删除当前系列
        case "delClass": {
          this.$confirm("此操作将永久删除该系列, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.dataList.splice(obj.key, 1);
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
          break;
        }
      }
    },
    /**
     * 删除精品
     */
    delItemButton(classKey, index) {
      this.$confirm("此操作将永久删除该精品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dataList[classKey].list.splice(index, 1);
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
    },
    /**
     * 新增精品保存按钮
     */
    classifySend() {
      //当输入名称为空时
      if (!this.classifyName.trim()) {
        this.$message({
          message: "请输入名称",
          type: "warning"
        });
        return;
      }
      this.dataList.push({
        id: this.dataList.length,
        name: this.classifyName,
        list: []
      });
      this.$message({
        message: "系列添加成功",
        type: "success"
      });
      //input框清空
      this.classifyName = "";
      //新增系列关闭
      this.isAddText = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../main.less");
.body {
  height: ~"calc( 100vh - @{app-header-height} )";
  width: 100vw;
  display: flex;
  flex-direction: column;
  .body-header {
    background-color: rgb(241, 241, 241);
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-left: 20px;
    flex-shrink: 0;
  }
  .body-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    align-content: flex-start;
    padding: 20px;
    flex-grow: 1;
    &::after {
      content: "";
      flex-shrink: 0;
      display: block;
      height: 100%;
      width: 20px;
    }
    .box-card {
      flex-shrink: 0;
      width: 250px;
      margin-right: 10px;
      height: 100%;
      overflow: hidden;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      background-color: #eee;
      position: relative;
      // 头部
      .box-card-header {
        padding: 10px 15px;
        flex-shrink: 0;
        font-weight: bold;
        //更多按钮
        .el-dropdown-link{
          user-select: none;
          cursor: pointer;
        }
      }
      //承装精品单例的
      .box-card-content {
        flex-grow: 1;
        overflow: auto;
        padding: 15px 0;
        padding-bottom: 50px;
        //精品单例
        .card-item {
          margin: 0 15px;
          margin-bottom: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 5px;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            transition: 0.2s;
          }
          &:hover::before {
            background-color: royalblue;
          }
          .card-item-in {
            img {
              width: 100%;
            }
            > div {
              font-size: 15px;
              padding: 5px 10px;
            }
            //删除当前精品
            .card-item-del {
              position: absolute;
              right: 0px;
              top: 0px;
              width: 30px;
              height: 30px;
              background-color: rgba(0, 0, 0, 0.5);
              display: none;
              justify-content: center;
              align-items: center;
              color: white;
              border-radius: 0 0 0 3px;
              cursor: pointer;
              transition: 0.2s;
              &:hover {
                background-color: rgb(255, 107, 107);
              }
            }
            &:hover > .card-item-del {
              display: flex;
            }
          }
        }
      }
      //   添加精品
      .card-add-bu {
        user-select: none;
        color: royalblue;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 15px;
        &:hover {
          background-color: rgb(221, 221, 221);
        }
      }
      //当里面的精品超过3个的时候，精品到底部定位
      .card-add-bu-absolute {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        padding: 15px 20px;
        background-color: #eee;
      }
    }
    // 添加精品系列
    .box-card-add {
      width: 250px;
      height: 65px;
      flex-shrink: 0;
      .box-card-add-text {
        font-size: 15px;
        color: cornflowerblue;
        cursor: pointer;
      }
      .box-card-add-footer {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
      }
    }
    //添加精品打开
    .box-card-add-show {
      height: 120px;
    }
  }
}
</style>