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
        <el-button type="danger" size="small" :disabled="delDisabled" @click="delButton">删除</el-button>
      </template>
      <el-table
        :row-class-name="rowClassName"
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="tableLoading"
        height="100%"
        @selection-change="selectionChange"
        @row-dblclick="rowDblclick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="Name" label="经销商名称" width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Phone" label="电话" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="AddressDetails" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <template slot="footer">
        <el-pagination
          background
          layout="prev, pager, next,jumper"
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
import {delData} from '@/api/public'
export default {
  components: {
    distributorModal,
    cardTable
  },
  data() {
    return {
      tableData: [],
      //选择的行信息
      selectionLine: [],
      //列表loading
      tableLoading: false,
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
      this.tableLoading = true;
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
          // console.log(res);
          //获取数据列表
          this.tableData = res.List || [];
          //获取总记录条数
          this.pageTotal = res.Total;
        })
        .finally(() => {
          this.tableLoading = false;
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
    delButton() {
      // for (let i = this.selectionLine.length - 1; i >= 0; i--) {
      //   this.tableData.splice(this.selectionLine[i]._index, 1);
      // }
      // console.log(this.selectionLine)
      delData({
        docType:'Dealer',
        list:this.selectionLine
      })
        .then((res)=>{
          this.getData();
        })
    },
    /**
     * 双击行信息的时候
     */
    rowDblclick(row, column, event) {
      this.$refs.distributorModal.show(Object.assign({}, row));
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
</style>