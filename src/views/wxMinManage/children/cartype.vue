<template>
  <div>
    <div class="body">
      <el-card v-loading="loading">
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
            v-for="(item,key) in formData"
            :key="item.UnionId"
          >
            <div class="item-box" :style="{'backgroundImage':'url('+imgUrl+item.ImgUrl+')'}">
              <div class="item-content">
                <div class="item-header" @click="push(key)">
                  <div>{{item.Name}}</div>
                  <i class="el-icon-arrow-right"></i>
                </div>
                <div class="item-setup">
                  <i class="el-icon-delete" @click.stop="deleteBtn(key)" style="margin-right:10px"></i>
                  <i class="el-icon-setting" @click.stop="cartypeModalSetting(key)"></i>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <el-pagination background layout="prev, pager, next,jumper" :total="pageTotal"></el-pagination>
      </el-card>
    </div>
    <!-- 设置与添加车型 -->
    <cartypeModal ref="cartypeModalRef" @on-upload="modalOnUpload"></cartypeModal>
  </div>
</template>

<script>
import cartypeModal from "./cartypeModal";
import { IMG_URL } from "@/config";
import { delData } from "@/api/public";

export default {
  name: "cartype",
  components: {
    cartypeModal
  },
  data() {
    return {
      imgUrl: IMG_URL,
      itemBg: require("@/assets/fz/Axc.jpg"),
      //数据
      formData: [],
      //数据个数
      pageTotal: 0,
      //
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 获取数据
     */
    getData(page = 1) {
      this.loading = true;
      this.$request({
        url: "/DoAction/GetListAndTotal",
        data: {
          DocType: "CarSer",
          Start: (page - 1) * 25,
          Limit: 25,
          Searchv: "" //快速检索条件
        }
      })
        .then(res => {
          console.log(res);
          this.formData = res.List || [];
          this.pageTotal = res.Total || 0;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 点击传递
     */
    push(key) {
      //缓存数据
      this.$store.commit("page/setClassifyCache", this.formData[key]);
      this.$router.push("/wxMinManage/classify");
    },
    /**
     * 点击打开车型编辑
     */
    cartypeModalShow() {
      this.$refs.cartypeModalRef.show();
    },
    /**
     * 车型修改
     */
    cartypeModalSetting(key) {
      this.$refs.cartypeModalRef.show(Object.assign({}, this.formData[key]));
    },
    /**
     * 删除车型
     */
    deleteBtn(key) {
      this.$confirm("此操作将永久删除该车型?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delData({
            docType: "CarSer",
            list: [this.formData[key]]
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getData();
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
     * 弹框数据更新
     */
    modalOnUpload() {
      this.getData();
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
  margin-right: -15px;
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
    position: relative;
    //承载内容
    .item-content{
      position: absolute;
      width:100%;
      height: 100%;
      left:0;
      top:0;
      background-color: rgba(0, 0, 0, 0.3);
      padding-top: 15px;
    }
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