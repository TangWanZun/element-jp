<template>
	<div style="height:100%;">
      <!-- 精品系列 -->
      <card-table style="height:100%;">
        <template slot="header">
          <el-input
            v-model="searchInput"
            size="small"
            placeholder="请输入查询条件"
            style="width:200px;margin-right:10px"
          ></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" circle></el-button>
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
          <el-table-column prop="name" label="系列名称"></el-table-column>
          <!-- <el-table-column prop="phone" label="系列精品数量" width="150"></el-table-column> -->
          <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
        </el-table>
        <template slot="footer">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :total="1000"
            @current-change="currentChange"
            small
          ></el-pagination>
        </template>
      </card-table>
    <boutiqueModal ref="boutiqueModal"></boutiqueModal>
  </div>
</template>

<script>
import boutiqueModal from "./boutiqueModal";
import cardTable from "@/components/card-table";
import { setTimeout } from "timers";
export default {
  components: {
    boutiqueModal,
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
      searchInput: ""
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
      setTimeout(() => {
		this.tableData = [];
		for(let i =0;i<10;i++){
			this.tableData.push({
				name:'轮胎',
				id:i+1
			})
		}
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
      this.$refs.boutiqueModal.show();
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
	rowClick(row, column, event){
		this.$emit('row-click',row, column, event)
	},
    /**
     * 双击行信息的时候
     */
    rowDblclick(row, column, event) {
      this.$refs.boutiqueModal.show();
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

</style>