<template>
  <div>
    <!-- 精品详情 -->
    <el-dialog
      title="编辑"
      :visible.sync="meValue"
      width="600px"
      custom-class="classifyModal-dialog-class"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-body">
        <el-tabs v-model="tabsValue">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="tabs-1">
            <el-form label-position="left" ref="form" :model="form" label-width="80px" size="mini">
              <el-form-item label="精品图片">
                <uploadImg></uploadImg>
              </el-form-item>
              <el-form-item label="精品名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 条目编辑 -->
          <el-tab-pane label="条目编辑" name="tabs-2">
            <div v-loading="tableLoading">
              <el-button size="mini" type="primary" @click="addButton">增加行</el-button>
              <el-button size="mini" type="danger" :disabled="delDisabled" @click="delButton">删除行</el-button>
              <el-table
                :row-class-name="rowClassName"
                :data="tableData"
                row-key="_index"
                stripe
                style="width: 100%"
                height="220"
                size="mini"
                @selection-change="selectionChange"
              >
                <el-table-column type="selection" width="30"></el-table-column>
                <!-- <el-table-column type="index" width="50"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="name" label="条目名称" width="130">
                  <TableEditItem slot-scope="scope" @change="tableEditItemChange" :scope="scope"></TableEditItem>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="info"
                  label="条目详情"
                  min-width="180"
                >
                  <TableEditItem slot-scope="scope" @change="tableEditItemChange" :scope="scope"></TableEditItem>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 适配车型 -->
          <el-tab-pane label="适配车型" name="tabs-3">
            <div v-loading="table2Loading">
              <el-select size="mini" style="margin-right:10px" v-model="table2Select" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in table2SelectOptions"
                  :key="item.index"
                  :label="item.itemName"
                  :value="item.index"
                ></el-option>
              </el-select>
              <el-button size="mini" type="primary" @click="addButton2">增加行</el-button>
              <el-button size="mini" type="primary" @click="addCarType">新增车型</el-button>
              <el-button size="mini" type="danger" :disabled="delDisabled2" @click="delButton2">删除行</el-button>
              <el-table
                :row-class-name="rowClassName"
                :data="table2Data"
                row-key="_index"
                stripe
                style="width: 100%"
                height="220"
                size="mini"
                @selection-change="selectionChange2"
              >
                <el-table-column type="selection" width="30"></el-table-column>
                <!-- <el-table-column type="index" width="50"></el-table-column> -->
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="itemCode"
                  label="车型编码"
                  width="130"
                ></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="itemName" label="车型名称"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close" :loading="subLoading">保 存</el-button>
      </span>
    </el-dialog>
    <cartypeModal ref="cartypeModal"></cartypeModal>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import TableEditItem from "@/components/table-edit-item";
import uploadImg from "@/components/upload-img";
import cartypeModal from "../../cartypeModal.vue"
export default {
  name: "rightCardModal",
  components: {
    TableEditItem,
    uploadImg,
    cartypeModal
  },
  props: {},
  data() {
    return {
      meValue: false,
      //是否添加条目
      addItemShow: false,
      //保存按钮loading
      subLoading: false,
      //条目编辑表loading
      tableLoading: false,
      //适配车型表loading
      table2Loading: false,
      //是否打开大图
      dialogVisible: false,
      //大图图片
      formData: {
        imgUrl: ""
      },
      //表单数据
      form: {
        name: "",
        phone: "",
        desc: "",
        imageUrl: ""
      },
      //tabs当前默认的页签
      tabsValue: "tabs-1",
      tableData: [],
      //条目编辑选择的行信息
      selectionLine: [],
      //适配车i选哪个选择的行信息
      selectionLine2: [],
      //适配车型的表格
      table2Data: [],
      //适配车型的选择框
      table2Select:'',
      //适配 车型选择的内容
      table2SelectOptions: [{
          index:0,
          itemCode: 'B01',
          itemName: 'A系'
        }, {
          index:1,
          itemCode: 'B02',
          itemName: 'B系'
        }, {
          index:2,
          itemCode: 'B03',
          itemName: 'S系'
        }, {
          index:3,
          itemCode: 'B04',
          itemName: 'SLC'
        }, {
          index:4,
          itemCode: 'B05',
          itemName: 'C系'
        }],
    };
  },
  created() {
    // this.show();
    // this.tabsValue = "tabs-3";
  },
  computed: {
    /**
     * 是否隐藏上传按钮
     */
    isNoneUpload() {
      // console.log(1,this.formData.imgUrl)
      // return ?true:false;
    },
    //删除行是否为禁用
    delDisabled() {
      return this.selectionLine.length == 0;
    },
    //适配车辆删除行是否为禁用
    delDisabled2() {
      return this.selectionLine2.length == 0;
    }
  },
  methods: {
    /**
     * 显示
     * 系统页面初始化
     */
    show(data) {
      this.meValue = true;
      //启动保存按钮loading
      this.subLoading = true;
      // 启动拖拽
      this.$nextTick(function() {
        this.rowDrop();
      });
      //获取数据
      Promise.all([this.getData1(), this.getData2()]).then(res => {
        this.subLoading = false;
      });
    },
    /**
     * 获取条目编辑信息
     */
    getData1() {
      return new Promise((resolve, reject) => {
        this.tableLoading = true;
        setTimeout(() => {
          //获取条目编辑的信息
          this.tableData = [
            {
              name: "品牌(ANZ)",
              info: "安之享"
            },
            {
              name: "编码采集",
              info: "JC-BB-AAS03-DNVJ"
            }
          ];
          this.tableLoading = false;
          resolve();
        }, 1000);
      });
    },
    /**
     * 获取适配车型信息
     */
    getData2() {
      return new Promise((resolve, reject) => {
        this.table2Loading = true;
        setTimeout(() => {
          //获取适配车型的信息
          for (let i = 0; i < 3; i++) {
            this.table2Data.push({
              itemCode: "A0" + (i + 1),
              itemName: "A系车"
            });
          }
          this.table2Loading = false;
          resolve();
        }, 1000);
      });
    },
    /**
     * 页面关闭
     */
    close() {
      //数据初始化
      Object.assign(this.$data, this.$options.data());
    },
    /**
     * 查看大图
     */
    handlePictureCardPreview(file) {
      this.formData.imgUrl = file.url;
      this.dialogVisible = true;
    },
    cardAddBu() {},
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
     * 适配车型选择项发生变化的时候
     */
    selectionChange2(selection) {
      this.selectionLine2 = selection;
    },
    /**
     * 添加行按钮
     */
    addButton() {
      // this.$refs.distributorModal.show();
      this.tableData.push({
        name: "",
        info: ""
      });
    },
    /**
     *  适配车型添加行
     */
    addButton2() {
      // console.log(this.table2Select);
      //将数据添加到表中
      let arr = this.table2Select;
      for(let i=0;i<arr.length;i++){
        let item = this.table2SelectOptions[arr[i]];
        //这里需要进行数据去重
        let isCf = false;
        for(let j=0;j<this.table2Data.length;j++){
          if(this.table2Data[j].itemCode==item.itemCode){
            isCf=true;
          }
        }
        if(!isCf)this.table2Data.push(item) 
      }
      //清空增加行
      this.table2Select=[]
    },
    /**
     * 新增车型
     */
    addCarType(){
      this.$refs.cartypeModal.show();
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
     * 适配车型删除行
     */
    delButton2() {
      for (let i = this.selectionLine2.length - 1; i >= 0; i--) {
        this.table2Data.splice(this.selectionLine2[i]._index, 1);
      }
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        }
      });
    },
    /**
     * 编辑特定行 的数据返回的时候
     */
    tableEditItemChange({ scope, value }) {
      this.tableData[scope.$index][scope.column.property] = value;
    }
  }
};
</script>
<style lang="less">
.classifyModal-dialog-class {
  .el-dialog__body {
    padding: 0 15px;
  }
}
</style>

<style lang="less" scoped>
//隐藏上传按钮
.none-upload .el-upload--picture-card {
  display: none;
}
//精品主要版面
.dialog-body {
  width: 100%;
  height: 300px;
}
// // 精品详情
// .dialog-body {
//   display: flex;
//   justify-content: flex-start;
//   .dialog-body-left {
//     width: 180px;
//     flex-shrink: 0;
//   }
//   .dialog-body-right {
//     padding-left: 10px;
//     flex-grow: 1;
//     border-left: 1px solid rgba(0, 0, 0, 0.08);
//   }
// }
// 条目列表
.item-list {
  margin-top: 10px;
  height: 200px;
  overflow: auto;
  .item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    .item-title {
      &::before {
        content: "【";
      }
      &::after {
        content: "】";
      }
    }
  }
}
</style>