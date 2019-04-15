<template>
  <div>
    <div class="body">
      <el-card>
        <div slot="header" class="clearfix">
          <el-input v-model="searchInput" size="small" placeholder="请输入内容" style="width:200px;margin-right:10px"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" circle></el-button>
          <el-button type="primary" size="small" @click="addButton">增加行</el-button>
          <el-button type="danger" size="small" :disabled="delDisabled" @click="delButton">删除行</el-button>
        </div>
        <el-table
          :row-class-name="rowClassName"
          :data="tableData"
          stripe
          style="width: 100%"
          v-loading="tableLoading"
          height="600px"
          @selection-change="selectionChange"
          @row-dblclick="rowDblclick"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="经销商名称" width="250"></el-table-column>
          <el-table-column prop="phone" label="电话" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <div class="card-footer">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :total="1000"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </el-card>
    </div>
    <distributorModal ref="distributorModal"></distributorModal>
  </div>
</template>

<script>
import distributorModal from "./distributorModal";
import { setTimeout } from "timers";
export default {
  components: {
    distributorModal
  },
  data() {
    return {
      tableData: [],
      //选择的行信息
      selectionLine: [],
      //列表loading
      tableLoading: false,
      //搜索
      searchInput:''
    };
  },
  computed: {
    //删除行是否为禁用
    delDisabled() {
      return this.selectionLine.length == 0;
    }
  },
  created(){
    this.getData()
  },
  methods: {
    /**
     * 获取数据
     */
    getData(page=0) {
      this.tableLoading = true;
      setTimeout(() => {
        this.tableData = [
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1516 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1516 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            name: "北京鹏龙经销商",
            phone: "010-0675331",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ];
        this.tableLoading = false;
      }, 500);
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
      for (let i = this.selectionLine.length - 1; i >= 0; i--) {
        this.tableData.splice(this.selectionLine[i]._index, 1);
      }
    },
    /**
     * 双击行信息的时候
     */
    rowDblclick(row, column, event) {
      this.$refs.distributorModal.show();
    },
    /**
     * 当分页的页码改变的时候
     */
    currentChange(page) {
      //清空数据
      this.tableData = [];
      //获取数据
      this.getData(page);
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