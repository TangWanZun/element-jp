<template>
  <div style="height:100%;">
    <!-- 精品分类 -->
    <card-table style="height:100%;">
      <template slot="header">
        <el-input
          v-model="searchInput"
          size="small"
          placeholder="请输入查询条件"
          style="width:200px;margin-right:10px"
          @keyup.native.enter="getData"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" circle @click="getData(1)"></el-button>
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
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <!-- <el-table-column prop="name" label="精品图片"></el-table-column> -->
        <el-table-column prop="Code" label="精品编码" width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Name" label="精品名称" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="IsAdapAll" label="是否适配全车系" ></el-table-column> -->
        <!-- <el-table-column prop="car" label="适配车系" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column prop="phone" label="分类精品数量" width="150"></el-table-column> -->
        <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
      </el-table>
      <template slot="footer">
        <el-pagination
          background
          layout="total,prev, pager, next,jumper"
          :total="pageTotal"
          :page-size="25"
          @current-change="currentChange"
          small
        ></el-pagination>
      </template>
    </card-table>
    <rightCardModal ref="rightCardModal" @on-upload="modalUpload"></rightCardModal>
  </div>
</template>

<script>
import rightCardModal from "./right-card-modal";
import cardTable from "@/components/card-table";
import { setTimeout } from "timers";
import { getJpItem } from "@/api/data";
import { delData } from "@/api/public";

export default {
  components: {
    rightCardModal,
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
      //分类名称ID
      itemId: 0,
      //从分类中传过来的数据
      data: {},
      //数据数量
      pageTotal: 0
    };
  },
  computed: {
    //删除行是否为禁用
    delDisabled() {
      return this.selectionLine.length == 0;
    }
  },
  // created() {
  //   this.getData();
  // },
  methods: {
    /**
     * 数据更新
     */
    dataShow(data) {
      // //console.log(data);
      // 保存分类ID
      this.data = data;
      //获取数据
      this.getData();
    },
    /**
     * 获取数据
     */
    getData(page = 1) {
      this.tableLoading = true;
      // this.$request({
      //   url: "/DoAction/GetListAndTotal",
      //   data: {
      //     DocType: "JpItem",
      //     Start: (page-1)*25,
      //     Limit: 25,
      //     p1:this.data.DocId,
      //     Searchv:this.searchInput
      //   }
      // })
      getJpItem({
        page,
        Id: this.data.Id,
        searchv: this.searchInput
      })
        .then(res => {
          // //console.log(res);
          this.tableData = res.List || [];
          this.pageTotal = res.Total || 0;
        })
        .finally(() => {
          this.tableLoading = false;
        });
      // setTimeout(() => {
      //   this.tableData = [];
      //   for (let i = 0; i < 20; i++) {
      //     this.tableData.push({
      //       itemCode: "JC-MB-A02-013",
      //       itemName:
      //         "丹麦.丹拿旗舰版奔驰专用音响套装（SurpaxM17F+SurpaxM17B+SurpaxM17S）",
      //       car: "奔驰C/E/GLC、S级高音中音"
      //     });
      //   }
      // }, 500);
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
      this.$refs.rightCardModal.show(
        {},
        {
          //添加当前分类
          _unionCode: this.data.DocId,
          _unionName: this.data.Name
        }
      );
    },
    /**
     * 删除行按钮
     */
    delButton() {
      // for (let i = this.selectionLine.length - 1; i >= 0; i--) {
      //   this.tableData.splice(this.selectionLine[i]._index, 1);
      // }
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delData({
              url:"/JpItem/Delete",
            docType: "JpItem",
            list: this.selectionLine
          }).finally(res => {
            this.getData();
          });
        })
        .catch(() => {});
    },
    /**
     * 双击行信息的时候
     */
    rowDblclick(row, column, event) {
      this.$refs.rightCardModal.show({ isAdd: false }, Object.assign({}, row));
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
</style>