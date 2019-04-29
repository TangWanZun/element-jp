<template>
  <div>
    <div class="body">
      <div class="body-header">
        <el-button
          @click="upPage"
          type="primary"
          icon="el-icon-arrow-left"
          style="margin-right:10px"
          size="small"
        >上一页</el-button>
        {{parentData.Name}}
        <el-button
          @click="dataSubmit"
          type="primary"
          style="float:right"
          size="small"
          :loading="subLoading"
        >保存修改</el-button>
      </div>
      <div class="body-content" v-loading="contentLoading">
        <div id="body-content">
          <div
            shadow="hover"
            :body-style="{padding:'0px'}"
            class="box-card"
            v-for="(item,key) in dataList"
            :key="item.ItemGroup"
          >
            <!-- 头部 -->
            <div class="box-card-header">
              <span>
                <i class="el-icon-rank"></i>
                {{item.ItemGroupName}}
              </span>
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
                    >删除当前分类</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <!-- 内容 -->
            <div class="box-card-content">
              <div class="box-card-content-drop">
                <el-card
                  v-for="(cardItem,cardIndex) in item.List"
                  :key="cardItem.DocId"
                  class="card-item"
                  :body-style="{padding:'0px'}"
                  shadow="never"
                >
                  <div class="card-item-in">
                    <div
                      class="card-item-img"
                      :style="'background-image:url('+imgUrl+cardItem.ImgUrl+')'"
                    ></div>
                    <!-- <img :src="imgUrl+cardItem.ImgUrl" alt srcset> -->
                    <div>{{cardItem.Name}}</div>
                    <!-- 删除按钮 -->
                    <div
                      class="card-item-del"
                      @click.stop="delItemButton(key,cardIndex)"
                      v-if="!cardItem.IsAdapAll"
                    >
                      <i class="el-icon-delete"></i>
                    </div>
                    <div class="card-item-qx" v-else>
                      <!-- <i class="el-icon-delete"></i> -->
                      全
                    </div>
                  </div>
                </el-card>
              </div>
              <div
                class="card-add-bu"
                :class="{'card-add-bu-absolute': item.List.length>3}"
                @click="cardAddButton(key)"
              >
                <i class="el-icon-circle-plus-outline"></i>
                添加精品
              </div>
            </div>
          </div>
        </div>

        <el-card class="box-card-add" shadow="hover" :class="{'box-card-add-show':isAddText}">
          <div class="box-card-add-text" v-if="!isAddText" @click="isAddText=true">新建精品分类</div>
          <div v-else>
            <div>
              <el-select v-model="classifyIndex" placeholder="请选择">
                <el-option
                  v-for="(item,key) in classOptions"
                  :key="key"
                  :label="item.Name"
                  :value="key"
                ></el-option>
              </el-select>
            </div>
            <div class="box-card-add-footer">
              <el-button style="padding:8px 15px" type="primary" @click="classifySend()">保存</el-button>
              <el-button style="padding:8px 15px" type="text" @click="isAddText=false">取消</el-button>
              <!-- <el-button style="padding:8px 15px;float:left" @click="addSingin">新建</el-button> -->
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 新增精品 -->
    <classifyModal ref="classifyModal" @on-upload="classifyModalOnUpload"></classifyModal>
    <!-- 新增精品分类 -->
    <leftCardModal ref="leftCardModal" @on-upload="leftCardModalOnUpload"></leftCardModal>
  </div>
</template>

<script>
import classifyModal from "./classifyModal";
import leftCardModal from "./boutique/components/left-card-modal";
import { setTimeout } from "timers";
import { IMG_URL } from "@/config";
import { getItemGroup } from "@/api/data";
import { arrUnique } from "@/library/util";
import uuidv1 from "uuid/v1";
import Sortable from "sortablejs";

export default {
  name: "classify",
  components: {
    classifyModal,
    leftCardModal
  },
  data() {
    return {
      imgUrl: IMG_URL,
      //页面加载
      contentLoading: true,
      //新建精品是否启动
      isAddText: false,
      //获取精品分类
      dataList: [],
      //添加的精品分类code
      classifyIndex: "",
      //添加精品分类
      classOptions: [],
      //由父组件传递过来的数据
      parentData: this.$store.state.page.classifyCache,
      //当前添加的精品分类索引值
      singInIndex: -1,
      //保存按钮的loading
      subLoading: false
    };
  },
  created() {
    //console.log(this.parentData);
    //数据拉取
    this.getData();
  },
  methods: {
    /**
     * 获取数据
     */
    getData() {
      this.contentLoading = true;
      this.$request({
        url: "/DoAction/GetMainSubList",
        data: {
          DocType: "CarSer",
          ActionType: "JpItemGroup",
          DocId: this.parentData.DocId //车系主键
        }
      })
        .then(res => {
          this.dataList = res || [];
          //获取精品分类
          this.meGetItemGroup();
          //console.log(this.dataList);
          //启动拖拽
          this.$nextTick(function() {
            //精品分类下的精品拖动排序
            this.itemRowDrop();
            //精品分类拖动排序
            this.grundDrop();
          });
        })
        .finally(() => {
          this.contentLoading = false;
        });
    },
    /**
     * 获取精品分类信息
     */
    meGetItemGroup() {
      //获取精品分类信息
      getItemGroup().then(res => {
        //这里需要进行去重
        this.classOptions =
          arrUnique(res.List, this.dataList, "DocId", "ItemGroup") || [];
      });
    },
    /**
     * 返回上一页
     */
    upPage() {
      this.$router.go(-1);
    },
    /**
     * 新建精品分类
     */
    addSingin() {
      this.$refs.leftCardModal.show();
    },
    /**
     * 新建精品分类成功回调
     */
    leftCardModalOnUpload(res) {
      //console.log(res);
      //自动赋值
      this.classifySend({
        DocId: res.DocId,
        ItemGroupName: res.Name,
        UnionGuid: res.UnionGuid
      });
    },
    /**
     * 新增精品分类保存按钮
     */
    classifySend(data) {
      let item = data || this.classOptions[this.classifyIndex];
      //console.log(item);
      //添加新的精品分类
      this.dataList.push({
        ItemGroup: item.UnionGuid,
        ItemGroup: item.DocId,
        ItemGroupName: item.Name,
        List: []
      });
      this.$message({
        message: "分类添加成功",
        type: "success"
      });
      //input框清空
      this.classifyIndex = "";
      //新增分类关闭
      this.isAddText = false;
      //并且刷新精品分类
      this.meGetItemGroup();
      //并且对新增加的精品分类添加拖动排序
      //启动拖拽
      this.$nextTick(function() {
        this.itemRowDrop(true);
      });
    },
    /**
     * 添加精品
     */
    cardAddButton(key) {
      this.singInIndex = key;
      this.$refs.classifyModal.show({}, Object.assign({}, this.dataList[key]));
    },
    /**
     * 添加精品回调
     */
    classifyModalOnUpload(res) {
      //console.log(res);
      let arr = [];
      this.dataList[this.singInIndex].List = arr.concat(
        this.dataList[this.singInIndex].List,
        res
      );
    },
    /**
     * 点击更多项
     */
    dropdownCommand(obj) {
      switch (obj.name) {
        //点击删除当前分类
        case "delClass": {
          this.$confirm(
            "此操作将删除该分类及该分类下所配置的精品，是否继续？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.dataList.splice(obj.key, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(() => {});
          break;
        }
      }
    },
    /**
     * 删除精品
     */
    delItemButton(classKey, index) {
      this.dataList[classKey].List.splice(index, 1);
      // this.$confirm("此操作将永久删除该精品信息, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.dataList[classKey].List.splice(index, 1);
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },
    /**
     * 保存修改信息
     */
    dataSubmit() {
      this.subLoading = true;
      let guid = uuidv1();
      let dataList = this.dataList;
      //获取适配表的版本号
      let meGuid = dataList.length == 0 ? guid : dataList[0].VerNum || guid;
      //获取全部的精品数据
      let itemList = [];
      //合并精品数据
      for (let i = 0; i < dataList.length; i++) {
        itemList = itemList.concat(dataList[i].List);
      }
      //添加lineId
      itemList.forEach((item, index) => {
        item.LineId = index;
      });
      // //console.log({
      //   DocType: "CarSerJpItem",
      //     ActionType: "AddOrUpdate",
      //     DocId: this.parentData.DocId,
      //     UnionGuid: meGuid,
      //     UnionGuidTemp: guid,
      //     DocJson: {
      //       List: itemList
      //     }
      // })
      this.$request({
        url: "/DoAction/Submit",
        data: {
          DocType: "CarSerJpItem",
          ActionType: "AddOrUpdate",
          DocId: this.parentData.DocId,
          UnionGuid: meGuid,
          UnionGuidTemp: guid,
          DocJson: {
            List: itemList
          }
        }
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .finally(() => {
          this.subLoading = false;
        });
    },
    /**
     * 精品分类下的精品拖动排序
     * isLastItemDrop 是否只对最后一个精品分类下的精品添加拖动排序
     */
    itemRowDrop(isLastItemDrop = false) {
      let boxList = document.querySelectorAll(".box-card-content-drop");
      const _this = this;
      if (isLastItemDrop) {
        //仅仅对最后一个添加拖动排序
        let itemList = _this.dataList[boxList.length - 1];
        Sortable.create(boxList[boxList.length - 1], {
          onEnd({ newIndex, oldIndex }) {
            // //console.log(i)
            const currRow = itemList.List.splice(oldIndex, 1)[0];
            itemList.List.splice(newIndex, 0, currRow);
          }
        });
      } else {
        for (let i = 0; i < boxList.length; i++) {
          let itemList = _this.dataList[i];
          Sortable.create(boxList[i], {
            onEnd({ newIndex, oldIndex }) {
              // //console.log(i)
              const currRow = itemList.List.splice(oldIndex, 1)[0];
              itemList.List.splice(newIndex, 0, currRow);
            }
          });
        }
      }
    },
    /**
     * 精品分类拖拽
     */
    grundDrop() {
      let _this = this;
      //精品分类排序
      Sortable.create(document.querySelector("#body-content"), {
        handle: ".el-icon-rank",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.dataList.splice(oldIndex, 1)[0];
          _this.dataList.splice(newIndex, 0, currRow);
        }
      });
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
    background-color: #f5f5f5;
    border-bottom: 1px solid #d9d9d9;
    height: 50px;
    // display: flex;
    // align-items: center;
    font-size: 18px;
    padding-left: 20px;
    padding-top: 8px;
    padding-right: 15px;
    flex-shrink: 0;
  }
  //使用与拖放
  .body-content {
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    &::after {
      content: "";
      flex-shrink: 0;
      display: block;
      height: 100%;
      width: 20px;
    }
    // 添加精品分类
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
  //用于精品拖放
  #body-content {
    display: flex;
    align-content: flex-start;

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
      user-select: none;
      // 头部
      .box-card-header {
        padding: 10px 15px;
        flex-shrink: 0;
        font-weight: bold;
        .el-icon-rank {
          cursor: move;
        }
        //更多按钮
        .el-dropdown-link {
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
          cursor: pointer;
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
            .card-item-img {
              width: 100%;
              height: 100px;
              background-color: rgba(0, 0, 0, 0.2);
              background-size: cover;
              background-position: center;
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
            //适配全部车辆
            .card-item-qx {
              .card-item-del;
              display: flex;
              &:hover {
                background-color: rgba(0, 0, 0, 0.5);
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
  }
}
</style>