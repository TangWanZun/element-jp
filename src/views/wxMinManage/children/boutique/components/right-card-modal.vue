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
                <el-select
                  v-loading="itemGroupLoading"
                  v-model="form.DocJson.ItemGroup"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in baseSelectOptions"
                    :key="item.DocId"
                    :label="item.Name"
                    :value="item.DocId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="精品图片">
                <uploadImg :imgUrl="form.DocJson.ImgUrl" @on-upload="form.DocJson.ImgUrl=$event"></uploadImg>
              </el-form-item>-->
              <el-form-item label="精品编码">
                <el-input v-model="form.DocJson.Code"></el-input>
              </el-form-item>
              <el-form-item label="精品名称">
                <el-input v-model="form.DocJson.Name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 精品图片 -->
          <el-tab-pane label="精品图片" name="tabs-4">
            <div style="height:250px;overflow:auto;padding-right:15px;">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                accept="image/png,image/jpeg"
                :file-list="imgList"
                :on-success="handleAvatarSuccess"
                :on-remove="deleteImage"
                :before-upload="beforeAvatarUpload"
                list-type="picture"
                name="mediaFile"
                :data="imgForData"
                with-credentials
                :headers="{}"
                ref="upload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
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
          <!-- 适配车系 -->
          <el-tab-pane label="适配车系" name="tabs-3">
            <div v-loading="subLoading">
              <el-select
                v-loading="carSerSelLoading"
                filterable
                size="mini"
                style="margin-right:10px"
                v-model="table2Select"
                multiple
                collapse-tags
                placeholder="请选择"
                :disabled="form.DocJson.IsAdapAll"
              >
                <el-option
                  v-for="(item,key) in carSerSelectOptions"
                  :key="key"
                  :label="item.Name"
                  :value="key"
                ></el-option>
              </el-select>
              <el-button
                size="mini"
                type="primary"
                @click="addButton2"
                :disabled="form.DocJson.IsAdapAll"
              >增加行</el-button>
              <!-- <el-button size="mini" type="primary" @click="addCarType" :disabled="form.DocJson.IsAdapAll">新增车系</el-button> -->
              <el-button
                size="mini"
                type="danger"
                :disabled="delDisabled2||form.DocJson.IsAdapAll"
                @click="delButton2"
              >删除行</el-button>
              <el-switch
                style="margin-left:10px"
                v-model="form.DocJson.IsAdapAll"
                active-text="适配全车系"
                inactive-text
              ></el-switch>
              <div class="table-body">
                <div class="table-make" :class="{'table-make-show':form.DocJson.IsAdapAll}"></div>
                <el-table
                  :row-class-name="rowClassName"
                  :data="form.DocJson.List3"
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
                    width="100"
                    prop="Name"
                    label="车系名称"
                  ></el-table-column>
                  <el-table-column :show-overflow-tooltip="true" prop="DocId" label="车系编码"></el-table-column>
                </el-table>
              </div>
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
// import uploadImg from "@/components/upload-img";
import cartypeModal from "../../cartypeModal.vue";
import uuidv1 from "uuid/v1";
import { Promise } from 'q';
import {FILE_URL,IMG_URL} from '@/config'
import {find} from '@/library/util'
export default {
  name: "rightCardModal",
  components: {
    TableEditItem,
    // uploadImg,
    cartypeModal
  },
  props: {},
  data() {
    return {
      uploadUrl:FILE_URL,
      // uploadUrl:'https://jsonplaceholder.typicode.com/posts/',
      meValue: false,
      //是否添加条目
      addItemShow: false,
      //保存按钮loading
      subLoading: false,
      //是否为新增数据
      isAddData: true,
      //精品分类下拉框
      baseSelectOptions: [],
      //车系下拉框
      carSerSelectOptions: [],
      //从外面传递进来的数据
      data: {},
      imgForData:{
        docType:'Dealer'
      },
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
          //行信息-精品照片
          List2: [],
          //行信息-适车系
          List3: []
        }
      },
      //tabs当前默认的页签
      tabsValue: "tabs-1",
      //精品照片 列表
      imgList:[],
      //条目编辑选择的行信息
      selectionLine: [],
      //适配车i选哪个选择的行信息
      selectionLine2: [],
      //适配车系的选择框
      table2Select: [],
      //精品分类的loading
      itemGroupLoading: false,
      //车系下拉框的loading
      carSerSelLoading: false
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
      // //console.log(1,this.formData.imgUrl)
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
    show({ isAdd = true } = {}, data = {}) {
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
        Promise.all([this.getData1(), this.getData2(), this.getData3()]).then(
          res => {
            // //console.log(res);
            this.form.DocJson.List1 = res[0].List || [];
            this.form.DocJson.List3 = res[1].List || [];
            // this.form.DocJson.List2 = res[2].List || [];
            this.subLoading = false;
          }
        );
      }
    },
    /**
     * 获取全部精品分类信息
     */
    getItemGroup() {
      this.itemGroupLoading = true;
      this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "ItemGroupSel"
        }
      }).then(res => {
        this.baseSelectOptions = res.List || [];
        this.itemGroupLoading = false;
      });
    },
    /**
     * 获取车系下拉框
     */
    getCarSerSel() {
      this.carSerSelLoading = true;
      this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "CarSerSel"
        }
      }).then(res => {
        this.carSerSelectOptions = res.List || [];
        this.carSerSelLoading = false;
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
          DocId: this.data.DocId //精品项目主键
        }
      });
    },
    /**
     * 获取适配车系信息
     */
    getData2() {
      return this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "JpItem3",
          DocId: this.data.DocId //精品项目主键
        }
      });
    },
    /**
     * 获取精品图片子表
     */
    getData3() {
      return this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "JpItem",
          ActionType: "JpItem2",
          DocId: this.data.DocId //精品项目主键
        }
      });
      return new Promise((resolve,reject)=>{
        this.$request({
          url: "/DoAction/GetSingleList",
          data: {
            DocType: "JpItem",
            ActionType: "JpItem2",
            DocId: this.data.DocId //精品项目主键
          }
        })
          .then((res)=>{
            //这里还需要将获取的精品图片的数据  修改一下
            let imgList = [];
            for(let item of res){
              imgList.push({
                name:item.LineId,
                url:IMG_URL+item.ImgUrl
              })
            }
            this.imgList = imgList;
            resolve(res);
          })
          .catch(error=>{
            reject(error)
          })
      })
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
        this.form.DocId = this.data.DocId;
      }
      //将精品图片转化成可以上传的
      let imgList = this.imgList;
      let List2 = [];
      for(let i in imgList){
        List2.push({
          LineId:i,
          ImgUrl:imgList[i]._url
        })
      }
      this.form.DocJson.List2 = List2;
      // console.log(this.form);
      this.$request({
        url: "/DoAction/Submit",
        data:this.form
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
     * 适配车系选择项发生变化的时候
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
     *  适配车系添加行
     */
    addButton2() {
      // //console.log(this.table2Select);
      //将数据添加到表中
      let arr = this.table2Select;
      let list = this.form.DocJson.List3;
      for (let i = 0; i < arr.length; i++) {
        let item = this.carSerSelectOptions[arr[i]];
        //这里需要进行数据去重
        let isCf = false;
        for (let j = 0; j < list.length; j++) {
          if (list[j].DocId == item.DocId) {
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
     * 新增车系
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
     * 适配车系删除行
     */
    delButton2() {
      for (let i = this.selectionLine2.length - 1; i >= 0; i--) {
        this.form.DocJson.List3.splice(this.selectionLine2[i].LineId, 1);
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
    },
     /**
     * 上传成功之后
     */
    handleAvatarSuccess(res, file,fileList) {
      if(res.ErrCode==0){
        let index =  find(fileList,'uid',file.uid); 
        fileList[index]._url=res.Data
        //添加一个图片
          console.log('图片添加',fileList)
         this.imgList = fileList;
        // this.form.List2.push(res)
      }
      if(res.ErrCode==1){
        this.$message.error(res.ErrMsg);
        this.$refs.upload.clearFiles();
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 删除列表中的图片
     */
    deleteImage(file, fileList){
      console.log('图片删除',fileList)
      this.imgList = fileList;
    },
    /**
     * 上传之前
     */
    beforeAvatarUpload(file) {
      const isImg =( file.type.indexOf("image") >-1);
      if (!isImg) {
        this.$message.error("请上传图片格式文件");
      }
      return isImg;
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
//添加适配车系  对表格的禁止修改
.table-body {
  position: relative;
  .table-make {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    // height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 2;
    transition: 0.1s;
  }
  .table-make-show {
    height: 100%;
  }
}
</style>