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
        <el-table
          :row-class-name="rowClassName"
          :data="tableData"
          stripe
          style="width: 100%"
          height="270"
          size="mini"
          v-loading="subLoading"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="30" :selectable="selectable"></el-table-column>
          <!-- <el-table-column type="index" width="50"></el-table-column> -->
          <el-table-column :show-overflow-tooltip="true" prop="Code" label="集采产品编码" width="130"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="Name" label="精品名称" min-width="180"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="_isAdd"
            label="是否已添加"
            min-width="180"
          ></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next,jumper"
          :total="pageTotal"
          small
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="addItem" style="float:left">新增精品</el-button> -->
        <el-button type="primary" @click="submit" :loading="subLoading">添 加</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 展示大图 -->
    <rightCardModal ref="rightCardModal"></rightCardModal>
  </div>
</template>

<script>
import rightCardModal from "./boutique/components/right-card-modal.vue";
import { getJpItem } from "@/api/data";

export default {
  name: "classifyModal",
  components: {
    rightCardModal
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
      selectionLine: [],
      //外面传递进来的数据
      parentData: {},
      //总页数
      pageTotal: 0
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
    show({} = {}, data) {
      console.log(data);
      this.meValue = true;
      //保存数据
      this.parentData = data;
      //获取精品
      this.getJpList();
    },
    /**
     * 获取精品的列表
     */
    getJpList(page = 1) {
      //需要传入数据的时候
      this.subLoading = true;
      getJpItem({
        page,
        unionId: this.parentData.ContextUnionId,
        searchv: ""
      })
        .then(res => {
          //获取页数
          this.pageTotal = res.Total;
          //获取当前分类已经选择的数据
          let list = this.parentData.List;
          //这里添加是否添加的标识
          for (let j = 0; j < res.List.length; j++) {
            res.List[j]._isAdd = "-";
            for (let i = 0; i < list.length; i++) {
              if (list[i].UnionId == res.List[j].UnionId) {
                //存在   则打上标记
                res.List[j]._isAdd = "✔";
                break;
              }
            }
          }
          this.tableData = res.List || [];
        })
        .finally(() => {
          this.subLoading = false;
        });
    },
    /**
     * 判断当前精品是否可以点击
     */
    selectable(row) {
      return row._isAdd == "-";
    },
    /**
     * 页面关闭|
     */
    close() {
      //数据初始化
      Object.assign(this.$data, this.$options.data());
    },
    /**
     * 点击添加按钮
     */
    submit() {
      // console.log(this.selectionLine);
      this.$emit("on-upload", this.selectionLine);
      this.close();
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
     * 新增精品
     */
    addItem() {
      //这里需要注意，当在此页面添加一个新的精品的时候，精品
      //上的适配车型将自动添加本页面展示的车型
      this.$refs.rightCardModal.show({});
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