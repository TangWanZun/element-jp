<template>
  <div style="padding:15px;height:100%">
    <card-table style="height:100%" >
      <template slot="header">
        <el-input
          v-model="searchInput"
          size="small"
          placeholder="请输入查询条件"
          style="width:200px;margin-right:10px"
          @keyup.native.enter="getData"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click="getData" circle></el-button>
        <el-button
          style="padding:10px 15px"
          type="primary"
          size="small"
          @click="cartypeModalShow"
        >添加新车系</el-button>
      </template>
      <div class="list" v-loading="loading">
        <el-card
          :body-style="{padding:'0px',height: '150px'}"
          class="item"
          shadow="hover"
          v-for="(item,key) in formData"
          :key="item.DocId"
        >
          <div class="item-box" :style="{'backgroundImage':'url('+imgUrl+item.ImgUrl+')'}">
            <div class="item-content">
              <div class="item-header" @click="push(key)">
                <div>{{item.Name}}</div>
                <el-tooltip effect="dark" content="选配精品" placement="bottom">
                  <i class="el-icon-arrow-right"></i>
                </el-tooltip>
              </div>
              <div class="item-setup">
                <el-tooltip effect="dark" content="删除" placement="bottom">
                  <i class="el-icon-delete" @click.stop="deleteBtn(key)" style="margin-right:10px"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="修改" placement="bottom">
                  <i class="el-icon-setting" @click.stop="cartypeModalSetting(key)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <template slot="footer">
        <el-pagination
          :page-size="25"
          background
          layout="total,prev, pager, next,jumper"
          :total="pageTotal"
        ></el-pagination>
      </template>
    </card-table>
    <!-- 设置与添加车系 -->
    <cartypeModal ref="cartypeModalRef" @on-upload="modalOnUpload"></cartypeModal>
  </div>
</template>

<script>
import cartypeModal from "./cartypeModal";
import cardTable from "@/components/card-table";
import { IMG_URL } from "@/config";
import { delData } from "@/api/public";

export default {
  name: "cartype",
  components: {
    cartypeModal,
    cardTable
  },
  data() {
    return {
      imgUrl: IMG_URL,
      itemBg: require("@/assets/fz/Axc.jpg"),
      //数据
      formData: [],
      //数据个数
      pageTotal: 0,
      //列表loading
      loading: true,
      //搜索输入框
      searchInput: "",
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
          searchv: this.searchInput
        }
      })
        .then(res => {
          //console.log(res);
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
     * 点击打开车系编辑
     */
    cartypeModalShow() {
      this.$refs.cartypeModalRef.show();
    },
    /**
     * 车系修改
     */
    cartypeModalSetting(key) {
      this.$refs.cartypeModalRef.show(Object.assign({}, this.formData[key]));
    },
    /**
     * 删除车系
     */
    deleteBtn(key) {
      this.$confirm("此操作将删除该车系及该车系下所配置的精品，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delData({
            docType: "CarSer",
            list: [this.formData[key]]
          }).finally(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getData();
          });
        })
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
  height: 100%;
  overflow: auto;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
}
.item {
  width: 300px;
  margin-right: 10px;
  margin-bottom: 10px;
  transform: translateX(5px);
  .item-box {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    //承载内容
    .item-content {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
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
      i {
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
  //车系名称
  .dialog-name {
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>