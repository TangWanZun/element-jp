<template>
  <div>
    <!-- 精品详情 -->
    <el-dialog
      title="编辑"
      :visible.sync="meValue"
      width="620px"
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
              <el-form-item label="精品分类">
                <el-select v-model="form.DocJson.ItemGroup" clearable placeholder="请选择">
                  <el-option
                    v-for="item in baseSelectOptions"
                    :key="item.UnionId"
                    :label="item.Name"
                    :value="item.UnionId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="精品图片">
                <uploadImg :imgUrl="form.DocJson.ImgUrl" @on-upload="form.DocJson.ImgUrl=$emite"></uploadImg>
              </el-form-item>
              <div class="itemFlex">
                <el-form-item label="集采编码">
                  <el-input v-model="form.DocJson.Code"></el-input>
                </el-form-item>
                <el-form-item label="精品名称">
                  <el-input v-model="form.DocJson.Name"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
          <!-- 条目编辑 -->
          <el-tab-pane label="条目编辑" name="tabs-2">
            <div v-loading="subLoading" id="page-dorw">
              <el-button size="mini" type="primary" @click="addButton">增加行</el-button>
              <el-button size="mini" type="danger" :disabled="delDisabled" @click="delButton">删除行</el-button>
              <el-table
                :row-class-name="rowClassName"
                :data="form.DocJson.List1"
                row-key="LineId"
                stripe
                style="width: 100%"
                height="220"
                size="mini"
                @selection-change="selectionChange"
              >
                <el-table-column type="selection" width="30"></el-table-column>
                <!-- <el-table-column type="index" width="50"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="Name" label="条目名称" width="130">
                  <TableEditItem slot-scope="scope" @change="tableEditItemChange" :scope="scope"></TableEditItem>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="Value"
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
            <div v-loading="subLoading">
              <el-select
                size="mini"
                style="margin-right:10px"
                v-model="table2Select"
                multiple
                collapse-tags
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,key) in carSerSelectOptions"
                  :key="key"
                  :label="item.Name"
                  :value="key"
                ></el-option>
              </el-select>
              <el-button size="mini" type="primary" @click="addButton2">增加行</el-button>
              <el-button size="mini" type="primary" @click="addCarType">新增车型</el-button>
              <el-button size="mini" type="danger" :disabled="delDisabled2" @click="delButton2">删除行</el-button>
              <el-switch style="margin-left:10px" v-model="form.DocJson.IsAdapAll" active-text="适配全车系" inactive-text=""></el-switch>
              <el-table
                :row-class-name="rowClassName"
                :data="form.DocJson.List2"
                stripe
                style="width: 100%"
                height="220"
                size="mini"
                @selection-change="selectionChange2"
              >
                <el-table-column type="selection" width="30"></el-table-column>
                <!-- <el-table-column type="index" width="50"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" width="100" prop="Name" label="车型名称"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="UnionId" label="车型编码"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" :loading="subLoading">保 存</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
    <cartypeModal ref="cartypeModal"></cartypeModal>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import TableEditItem from "@/components/table-edit-item";
import uploadImg from "@/components/upload-img";
import cartypeModal from "../../cartypeModal.vue";
import uuidv1 from "uuid/v1";
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
      //是否为新增数据
      isAddData: true,
      //精品分类下拉框
      baseSelectOptions: [],
      //车型下拉框
      carSerSelectOptions: [],
      //从外面传递进来的数据
      data: {},
      //表单数据
      form: {
        DocType: "JpItem",
        ActionType: "AddOrUpdate",
        UnionGuid: "",
        UnionGuidTemp: "",
        DocJson: {
          Code: "", //集采编码 
          //标题信息
          Name: "",
          ImgUrl: "",
          ItemGroup: "", //精品分类的主键
          IsAdapAll: false, //是否适配全车系
          //行信息-条目
          List1: [],
          //行信息-适车系
          List2: []
        }
      },
      //tabs当前默认的页签
      tabsValue: "tabs-1",
      //条目编辑选择的行信息
      selectionLine: [],
      //适配车i选哪个选择的行信息
      selectionLine2: [],
      //适配车型的选择框
      table2Select: []
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
    show({
      isAdd=true
      }={}, data={}) {
      this.meValue = true;
      //启动保存按钮loading
      this.subLoading = true;
      // 启动拖拽
      this.$nextTick(function() {
        this.rowDrop();
      });
      //获取精品分类信息下拉框
      this.getItemGroup();
      //获取车系下拉框
      this.getCarSerSel();
      if (isAdd) {
        //当前为新增数据
        this.isAddData = true;
        this.subLoading = false;
        this.form.DocJson.ItemGroup = data._unionCode;
      } else {
        this.isAddData = false;
        this.data = data;
        this.form.DocJson = Object.assign(this.form.DocJson, data);
        //获取数据
        Promise.all([this.getData1(), this.getData2()]).then(res => {
          // console.log(res);
          this.form.DocJson.List1 = res[0].List || [];
          this.form.DocJson.List2 = res[1].List || [];
          this.subLoading = false;
        });
      }
    },
    /**
     * 获取全部精品分类信息
     */
    getItemGroup() {
      this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "ItemGroupSel"
        }
      }).then(res => {
        this.baseSelectOptions = res.List || [];
      });
    },
    /**
     * 获取车系下拉框
     */
    getCarSerSel() {
      this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "CarSerSel"
        }
      }).then(res => {
        this.carSerSelectOptions = res.List || [];
      });
    },
    /**
     * 获取条目编辑信息
     */
    getData1() {
      return this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "JpItem1",
          DocId: this.data.UnionId //精品项目主键
        }
      });
      // return new Promise((resolve, reject) => {
      //   this.tableLoading = true;
      //   setTimeout(() => {
      //     //获取条目编辑的信息
      //     this.form.DocJson.List1 = [
      //       {
      //         name: "品牌(ANZ)",
      //         info: "安之享"
      //       },
      //       {
      //         name: "编码采集",
      //         info: "JC-BB-AAS03-DNVJ"
      //       }
      //     ];
      //     this.tableLoading = false;
      //     resolve();
      //   }, 1000);
      // });
    },
    /**
     * 获取适配车型信息
     */
    getData2() {
      return this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "JpItem2",
          DocId: this.data.UnionId //精品项目主键
        }
      });
      return new Promise((resolve, reject) => {
        this.table2Loading = true;
        setTimeout(() => {
          //获取适配车型的信息
          for (let i = 0; i < 3; i++) {
            this.form.DocJson.List2.push({
              UnionId: "A0" + (i + 1),
              Name: "A系车"
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
     * 数据保存
     */
    submit() {
      this.subLoading = true;
      let guid = uuidv1();
      this.form.UnionGuidTemp = guid;
      if (this.isAddData) {
        //新增
        this.form.UnionGuid = guid;
      } else {
        this.form.UnionGuid = this.data.UnionGuid;
        this.form.DocId = this.data.UnionId;
      }
      // console.log(this.form);
      this.$request({
        url: "/DoAction/Submit",
        data: this.form
      })
        .then(res => {
          this.$emit("on-upload", res);
          this.close();
        })
        .finally(() => {
          this.subLoading = false;
        });
    },
    /**
     * 行回调函数
     */
    rowClassName({ row, rowIndex }) {
      row.LineId = rowIndex;
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
     * 条目编辑添加行按钮
     */
    addButton() {
      // this.$refs.distributorModal.show();
      this.form.DocJson.List1.push({
        Name: "",
        value: ""
      });
    },
    /**
     *  适配车型添加行
     */
    addButton2() {
      // console.log(this.table2Select);
      //将数据添加到表中
      let arr = this.table2Select;
      let list = this.form.DocJson.List2;
      for (let i = 0; i < arr.length; i++) {
        let item = this.carSerSelectOptions[arr[i]];
        //这里需要进行数据去重
        let isCf = false;
        for (let j = 0; j < list.length; j++) {
          if (list[j].UnionId == item.UnionId) {
            isCf = true;
            break;
          }
        }
        if (!isCf) list.push(item);
      }
      //清空增加行
      this.table2Select = [];
    },
    /**
     * 新增车型
     */
    addCarType() {
      this.$refs.cartypeModal.show();
    },
    /**
     * 删除行按钮
     */
    delButton() {
      for (let i = this.selectionLine.length - 1; i >= 0; i--) {
        this.form.DocJson.List1.splice(this.selectionLine[i].LineId, 1);
      }
    },
    /**
     * 适配车型删除行
     */
    delButton2() {
      for (let i = this.selectionLine2.length - 1; i >= 0; i--) {
        this.form.DocJson.List2.splice(this.selectionLine2[i].LineId, 1);
      }
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector(
        "#page-dorw .el-table__body-wrapper tbody"
      );
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.form.DocJson.List1.splice(oldIndex, 1)[0];
          _this.form.DocJson.List1.splice(newIndex, 0, currRow);
        }
      });
    },
    /**
     * 编辑特定行 的数据返回的时候
     */
    tableEditItemChange({ scope, value }) {
      this.form.DocJson.List1[scope.$index][scope.column.property] = value;
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
.itemFlex {
  display: flex;
  justify-content: space-between;
}
//隐藏上传按钮
.none-upload .el-upload--picture-card {
  display: none;
}
//精品主要版面
.dialog-body {
  width: 100%;
  height: 310px;
}
</style>