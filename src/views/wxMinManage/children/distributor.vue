<template>
  <div>
    <div class="body">
      <el-card>
        <div slot="header" class="clearfix">
          <el-button type="primary" @click="addButton">增加行</el-button>
          <el-button type="danger" :disabled="delDisabled" @click="delButton">删除行</el-button>
        </div>
        <el-table
          :row-class-name="rowClassName"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="经销商名称" width="250"></el-table-column>
          <el-table-column prop="phone" label="电话" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <div class="card-footer">
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </el-card>
    </div>
    <distributorModal ref="distributorModal"></distributorModal>
  </div>
</template>

<script>
import distributorModal from "./distributorModal";
export default {
  components: {
    distributorModal
  },
  data() {
    return {
      tableData: [
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
      ],
      //选择的行信息
      selectionLine: []
    };
  },
  computed: {
    //删除行是否为禁用
    delDisabled() {
      return this.selectionLine.length == 0;
    }
  },
  methods: {
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