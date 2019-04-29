<template>
  <div style="height:100%;padding:15px">
    <card-table style="height:100%">
      <template slot="header">
        <el-input
          v-model="searchInput"
          size="small"
          placeholder="请输入查询条件"
          style="width:200px;margin-right:10px"
          @keyup.native.enter="getData"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" circle @click="getData"></el-button>
        <el-button type="primary" size="small" @click="addButton">新增</el-button>
        <!-- <el-button type="danger" size="small" :disabled="delDisabled" @click="delButton">删除</el-button> -->
      </template>
      <div class="list" v-loading="listLoading">
        <el-card
          :body-style="{padding:'0px',height: '150px'}"
          class="item"
          shadow="hover"
          v-for="(item,key) in tableData"
          :key="item.DocId"
        >
          <div class="item-box" :style="{'backgroundImage':'url('+imgUrl+item.ImgUrl+')'}">
            <div class="item-content">
              <div class="item-header" @click="push(key)">
                <div>{{item.Name}}</div>
                <div>{{item.Phone}}</div>
                <div>{{item.AddressDetails}}</div>
                <!-- <el-tooltip effect="dark" content="选配精品" placement="bottom">
                  <i class="el-icon-arrow-right"></i>
                </el-tooltip>-->
              </div>
              <div class="item-setup">
                <el-tooltip effect="dark" content="删除" placement="bottom">
                  <i class="el-icon-delete" @click.stop="delButton(key)" style="margin-right:10px"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="修改" placement="bottom">
                  <i class="el-icon-setting" @click.stop="rowDblclick(key)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- <el-table
        :row-class-name="rowClassName"
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="listLoading"
        height="100%"
        @selection-change="selectionChange"
        @row-dblclick="rowDblclick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="Name" label="经销商名称" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Phone" label="电话" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="AddressDetails" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>-->
      <template slot="footer">
        <el-pagination
          background
          layout="total,prev, pager, next,jumper"
          :page-size="25"
          :total="pageTotal"
          @current-change="currentChange"
        ></el-pagination>
      </template>
    </card-table>
    <distributorModal ref="distributorModal" @on-upload="modalUpload"></distributorModal>
  </div>
</template>

<script>
import distributorModal from "./distributorModal";
import cardTable from "@/components/card-table";
import { setTimeout } from "timers";
import { delData } from "@/api/public";
import { IMG_URL } from "@/config";
export default {
  components: {
    distributorModal,
    cardTable
  },
  data() {
    return {
      imgUrl: IMG_URL,
      tableData: [],
      //选择的行信息
      selectionLine: [],
      //列表loading
      listLoading: false,
      //搜索
      searchInput: "",
      //总记录数量
      pageTotal: 0
    };
  },
  computed: {
    //删除行是否为禁用
    delDisabled() {
      return this.selectionLine.length == 0;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 获取数据
     */
    getData(page = 1) {
      this.listLoading = true;
      this.$request({
        url: "/DoAction/GetListAndTotal",
        data: {
          DocType: "Dealer",
          Start: (page - 1) * 25,
          Limit: 25,
          Searchv: this.searchInput //快速检索条件
        }
      })
        .then(res => {
          // //console.log(res);
          //获取数据列表
          this.tableData = res.List || [];
          //获取总记录条数
          this.pageTotal = res.Total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    /**
     * 行回调函数
     */
    rowClassName({ row, rowIndex }) {
      row._index = rowIndex;
    },
    /**
     * 当选择项发生变化的时候
     */
    selectionChange(selection) {
      this.selectionLine = selection;
    },
    /**
     * 添加行按钮
     */
    addButton() {
      this.$refs.distributorModal.show();
    },
    /**
     * 删除行按钮
     */
    delButton(key) {
      console.log(this.tableData[key])
      // for (let i = this.selectionLine.length - 1; i >= 0; i--) {
      //   this.tableData.splice(this.selectionLine[i]._index, 1);
      // }
      // //console.log(this.selectionLine)
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delData({
            docType: "Dealer",
            list: [this.tableData[key]]
          }).finally(res => {
            this.getData();
          });
        })
    },
    /**
     * 双击行信息的时候
     */
    rowDblclick(key) {
      this.$refs.distributorModal.show(Object.assign({}, this.tableData[key]));
    },
    /**
     * 当分页的页码改变的时候
     */
    currentChange(page) {
      //清空数据
      this.tableData = [];
      //获取数据
      this.getData(page);
    },
    /**
     * modal 数据更新
     */
    modalUpload() {
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  padding: 15px;
}
.card-footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  margin-right: -15px;
  height: 100%;
  width: 100%;
  overflow: auto;
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
      // display: flex;
      // justify-content: space-between;
      padding: 5px 0;
      position: relative;
      font-size: 15px;
      color: white;
      // cursor: pointer;
      > div {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 13px;
        padding:3px 15px;
        &:first-child {
          position: relative;
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
</style>