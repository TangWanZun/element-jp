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
          <el-tab-pane label="条目编辑" name="tabs-2">
            <div v-loading="subLoading">
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
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close" :loading="subLoading">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 展示大图 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="formData.imgUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import Sortable from "sortablejs";
import TableEditItem from "@/components/table-edit-item";
import uploadImg from "@/components/upload-img"
export default {
  name: "classifyModal",
  components: {
    TableEditItem,uploadImg
  },
  props: {},
  data() {
    return {
      meValue: false,
      //是否添加条目
      addItemShow: false,
      //保存按钮loading
      //也适用于条目编辑中的表格
      subLoading: false,
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
      selectionLine: []
    };
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
    }
  },
  methods: {
    /**
     * 显示
     * 系统页面初始化
     */
    show(data) {
      this.meValue = true;
      // 启动拖拽
      this.$nextTick(function() {
        this.rowDrop();
      });
      //需要传入数据的时候
      this.subLoading = true;
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
        this.subLoading = false;
      }, 3000);
    },
    /**
     * 页面关闭
     */
    close() {
      //数据初始化
      Object.assign(this.$data, this.$options.data())
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
     * 删除行按钮
     */
    delButton() {
      for (let i = this.selectionLine.length - 1; i >= 0; i--) {
        this.tableData.splice(this.selectionLine[i]._index, 1);
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