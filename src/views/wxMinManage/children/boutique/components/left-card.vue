<template>
  <div style="height:100%;">
    <!-- 精品分类 -->
    <card-table style="height:100%;">
      <template slot="header">
        <!-- <el-input
          v-model="searchInput"
          size="small"
          placeholder="请输入查询条件"
          style="width:150px;margin-right:10px"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" circle></el-button> -->
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
        highlight-current-row
        @selection-change="selectionChange"
        @row-dblclick="rowDblclick"
        @row-click="rowClick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="Name" label="分类名称"></el-table-column>
        <!-- <el-table-column prop="phone" label="分类精品数量" width="150"></el-table-column> -->
        <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
      </el-table>
      <!-- <template slot="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageTotal"
          :pager-count="5"
          @current-change="currentChange"
          small
        ></el-pagination>
      </template> -->
    </card-table>
    <leftCardModal ref="leftCardModal" @on-upload="onUpload"></leftCardModal>
  </div>
</template>

<script>
import leftCardModal from "./left-card-modal";
import cardTable from "@/components/card-table";
import { setTimeout } from "timers";
export default {
  components: {
    leftCardModal,
    cardTable
  },
  data() {
    return {
      tableData: [
        {
          Name:'全部',
          UnionGuid:''
        }
      ],
      //选择的行信息
      selectionLine: [],
      //列表loading
      tableLoading: false,
      //搜索
      searchInput: "",
      //全部数据
      pageTotal:0
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
    getData(page = 0) {
      this.tableLoading = true;
      this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "ItemGroup",
        }
      })
      .then((res)=>{
        this.tableData =this.tableData.concat(res.List||[]);
        this.pageTotal = res.Total||0;
      })
      .finally(()=>{
        this.tableLoading = false;
      })
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
      this.$refs.leftCardModal.show();
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
     * 单击行信息的时候
     */
    rowClick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
    /**
     * 双击行信息的时候
     */
    rowDblclick(row, column, event) {
      this.$refs.leftCardModal.show();
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
     * 新增分类
     */
    onUpload(){
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
</style>