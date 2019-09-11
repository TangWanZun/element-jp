<template>
  <div class="rightCardModal">
    <!-- 精品详情 -->
    <el-dialog
      title="编辑"
      :visible.sync="meValue"
      width="700px"
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
                  v-model="form.DocJson.ItemGroupId"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in baseSelectOptions"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id"
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
          <!-- 轮播展示 -->
          <el-tab-pane label="轮播展示" name="tabs-4">
            <div id="page-dorw2" v-loading="subLoading">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                accept="image/png, image/jpeg, video/mp4"
                :on-preview="clickFile"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                list-type="picture"
                name="mediaFile"
                with-credentials
                :headers="{}"
                ref="upload"
                :data="imgForData"
                multiple
                imgForData
                style="display: inline-block;margin-right:10px;"
              >
                <el-button size="mini" type="primary" :loading="upDataImgLoading">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <el-button size="mini" type="danger" :disabled="delDisabled3" @click="delButton3">删除行</el-button>
              <el-table
                :row-class-name="rowClassName"
                :data="form.DocJson.Banner"
                row-key="LineId"
                stripe
                style="width: 100%"
                height="220"
                size="mini"
                @selection-change="selectionChange3"
              >
                <el-table-column width="35">
                  <i class="el-icon-rank"></i>
                </el-table-column>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="MediaUrl" label="媒体预览" width="130" align="center">
                  <template slot-scope="scope">
                    <div class="img-box" v-if="scope.row.MediaType=='video/mp4'">
                      <img class="img-box-mp4" src="@/assets/img/mp4.svg" alt srcset />
                      <div class="img-box-modal">
                        <i
                          class="el-icon-zoom-in"
                          @click="showVidev(imgRootUrl+scope.row.MediaUrl,scope.row.MediaType)"
                        ></i>
                      </div>
                    </div>
                    <div class="img-box" v-else>
                      <img :src="imgRootUrl+scope.row.MediaUrl" class="img-box-img" alt srcset />
                      <div class="img-box-modal">
                        <i
                          class="el-icon-zoom-in"
                          @click="showImage(imgRootUrl+scope.row.MediaUrl,scope.row.MediaType)"
                        ></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="Name" label="媒体名称"></el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="MediaType"
                  label="类型"
                  width="130"
                ></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 条目编辑 -->
          <el-tab-pane label="条目编辑" name="tabs-2">
            <div id="page-dorw" v-loading="subLoading">
              <el-button size="mini" type="primary" @click="addButton">增加行</el-button>
              <el-button size="mini" type="danger" :disabled="delDisabled" @click="delButton">删除行</el-button>
              <el-table
                :row-class-name="rowClassName"
                :data="form.DocJson.Spec"
                row-key="LineId"
                stripe
                style="width: 100%"
                height="220"
                size="mini"
                @selection-change="selectionChange"
              >
                <el-table-column width="35">
                  <i class="el-icon-rank"></i>
                </el-table-column>
                <el-table-column type="selection" width="50"></el-table-column>
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
                  :data="form.DocJson.CarSerJp"
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
    <el-dialog width="500px" :visible.sync="showImageDialog" append-to-body class="show-image">
      <video :src="showImageUrl" v-if="showImageType=='video/mp4'" controls></video>
      <img v-else :src="showImageUrl" alt srcset />
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import TableEditItem from "@/components/table-edit-item";
// import uploadImg from "@/components/upload-img";
import cartypeModal from "../../cartypeModal.vue";
import uuidv1 from "uuid/v1";
import { Promise } from "q";
import { FILE_URL, IMG_URL } from "@/config";
import { find } from "@/library/util";
import { addUpdate } from "@/api/public";

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
      large: "",
      uploadUrl: FILE_URL,
      imgRootUrl: IMG_URL,
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
      imgForData: {
        docType: "JpIem"
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
          // ImgUrl: "",
          ItemGroupId: "", //精品分类的主键
          IsAdapAll: false, //是否适配全车系
          //行信息-条目
          Spec: [],
          //行信息-精品照片
          Banner: [],
          //行信息-适车系
          CarSerJp: []
        }
      },
      //tabs当前默认的页签
      tabsValue: "tabs-1",
      //条目编辑选择的行信息
      selectionLine: [],
      //适配车i选哪个选择的行信息
      selectionLine2: [],
      //轮播展示的选择的行信息
      selectionLine3: [],
      //适配车系的选择框
      table2Select: [],
      //精品分类的loading
      itemGroupLoading: false,
      //车系下拉框的loading
      carSerSelLoading: false,
      //图片上传的loading
      upDataImgLoading: false,
      //查看大图的dialog
      showImageDialog: false,
      //当前查看大图的类型
      showImageType: "",
      //当前查看大图的URL
      showImageUrl: ""
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
    },
    //轮播展示删除行是否为禁用
    delDisabled3() {
      return this.selectionLine3.length == 0;
    }
  },
  methods: {
    closeLarge() {
      this.large = "";
    },
    clickFile(file) {
      console.log(file.url);
      this.large = file.url;
    },
    /**
     * ==================================
     * 全局功能
     * ==================================
     */
    /**
     * 显示
     * 系统页面初始化
     */
    show({ isAdd = true } = {}, data = {}) {
      this.meValue = true;
      //启动保存按钮loading
      this.subLoading = false;
      // 启动拖拽
      this.$nextTick(function() {
        //条目编辑
        this.rowDrop2();
        //轮播展示
        this.rowDrop3();
      });
      //获取精品分类信息下拉框
      this.getItemGroup();
      //获取车系下拉框
      this.getCarSerSel();
      if (isAdd) {
        //当前为新增数据
        this.isAddData = true;
        this.form.DocJson.ItemGroupId = data._unionCode;
      } else {
        this.isAddData = false;
        this.data = data;
        this.subLoading = true;
        this.form.DocJson = Object.assign(this.form.DocJson, data);
        //获取数据
        Promise.all([this.getData1(), this.getData2(), this.getData3()]).then(
          res => {
            console.log(res);
            this.form.DocJson.Spec = res[0] || [];
            this.form.DocJson.CarSerJp = res[1] || [];
            this.form.DocJson.Banner = res[2] || [];
            this.subLoading = false;
          }
        );
      }
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
      addUpdate({
        docType: "JpItem",
        isAdd: this.isAddData,
        docJson: this.form.DocJson
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
     * ==================================
     * 获取子表信息
     * ==================================
     */
    /**
     * 获取全部精品分类信息
     */
    getItemGroup() {
      this.itemGroupLoading = true;
      this.$request({
        url: "/DoAction/GetSingleList",
        data: {
          DocType: "ItemGroup"
        }
      }).then(res => {
        this.baseSelectOptions = res || [];
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
        this.carSerSelectOptions = res || [];
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
          ActionType: "Spec",
          Id: this.data.Id //精品项目主键
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
          ActionType: "CarSerJp",
          Id: this.data.Id //精品项目主键
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
          ActionType: "Banner",
          Id: this.data.Id //精品项目主键
        }
      });
    },
    /**
     * ==================================
     * 表格全局功能
     * ==================================
     */
    /**
     * 编辑特定行 的数据返回的时候
     */
    tableEditItemChange({ scope, value }) {
      this.form.DocJson.Spec[scope.$index][scope.column.property] = value;
    },
    /**
     * 行回调函数
     */
    rowClassName({ row, rowIndex }) {
      row.LineId = rowIndex;
    },
    /**
     * ==================================
     * 轮播展示
     * ==================================
     */
    /**
     * 删除行按钮
     */
    delButton3() {
      for (let i = this.selectionLine3.length - 1; i >= 0; i--) {
        this.form.DocJson.Banner.splice(this.selectionLine3[i].LineId, 1);
      }
    },
    /**
     * 当选择项发生变化的时候
     */
    selectionChange3(selection) {
      this.selectionLine3 = selection;
    },
    //行拖拽
    rowDrop3() {
      const tbody = document.querySelector(
        "#page-dorw2 .el-table__body-wrapper tbody"
      );
      const _this = this;
      Sortable.create(tbody, {
        handle: "#page-dorw2 .el-icon-rank",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.form.DocJson.Banner.splice(oldIndex, 1)[0];
          _this.form.DocJson.Banner.splice(newIndex, 0, currRow);
        }
      });
    },
    /**
     * 上传成功之后
     */
    handleAvatarSuccess(res, file, fileList) {
      this.upDataImgLoading = false;
      if (res.Code == 0) {
        // let index = find(fileList, "uid", file.uid);
        // fileList[index]._url = res.Data;
        //添加一个图片
        // console.log("图片添加", file);
        this.form.DocJson.Banner.push({
          MediaUrl: file.response.Data,
          Name: file.name,
          MediaType: file.raw.type
        });
      } else {
        this.$message.error(res.Msg);
        this.$refs.upload.clearFiles();
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 上传之前
     */
    beforeAvatarUpload(file) {
      const isImg =
        file.type.indexOf("image") > -1 || file.type.indexOf("mp4") > -1;
      if (!isImg) {
        this.$message.error("请上传jpg/png图片格式或者为mp4的视频文件");
        return;
      }
      this.upDataImgLoading = true;
      return isImg;
    },
    /**
     * 查看图片大图
     */
    showImage(url, type) {
      this.showImageDialog = true;
      this.showImageUrl = url;
      this.showImageType = type;
    },
    /**
     * 查看视频大图
     */
    showVidev(url, type) {
      this.showImageDialog = true;
      this.showImageUrl = url;
      this.showImageType = type;
    },
    /**
     * ==================================
     * 条目编辑
     * ==================================
     */
    /**
     * 条目编辑添加行按钮
     */
    addButton() {
      // this.$refs.distributorModal.show();
      this.form.DocJson.Spec.push({
        Name: "",
        value: ""
      });
    },
    /**
     * 删除行按钮
     */
    delButton() {
      for (let i = this.selectionLine.length - 1; i >= 0; i--) {
        this.form.DocJson.Spec.splice(this.selectionLine[i].LineId, 1);
      }
    },
    /**
     * 当选择项发生变化的时候
     */
    selectionChange(selection) {
      this.selectionLine = selection;
    },
    //行拖拽
    rowDrop2() {
      const tbody = document.querySelector(
        "#page-dorw .el-table__body-wrapper tbody"
      );
      const _this = this;
      Sortable.create(tbody, {
        handle: "#page-dorw .el-icon-rank",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.form.DocJson.Spec.splice(oldIndex, 1)[0];
          _this.form.DocJson.Spec.splice(newIndex, 0, currRow);
        }
      });
    },
    /**
     * ==================================
     * 适配车系
     * ==================================
     */
    /**
     * 适配车系选择项发生变化的时候
     */
    selectionChange2(selection) {
      this.selectionLine2 = selection;
    },
    /**
     *  适配车系添加行
     */
    addButton2() {
      // //console.log(this.table2Select);
      //将数据添加到表中
      let arr = this.table2Select;
      let list = this.form.DocJson.CarSerJp;
      for (let i = 0; i < arr.length; i++) {
        let item = this.carSerSelectOptions[arr[i]];
        //这里需要进行数据去重
        let isCf = false;
        for (let j = 0; j < list.length; j++) {
          if (list[j].Id == item.Id) {
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
     * 适配车系删除行
     */
    delButton2() {
      for (let i = this.selectionLine2.length - 1; i >= 0; i--) {
        this.form.DocJson.CarSerJp.splice(this.selectionLine2[i].LineId, 1);
      }
    },
    /**
     * 新增车系
     */
    addCarType() {
      this.$refs.cartypeModal.show();
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
.rightCardModal {
  .large-img {
    padding: 10vw;
    position: absolute;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    i {
      color: #fff;
      position: absolute;
      right: 5%;
      top: 5%;
      font-size: 2rem;
    }
    img {
      width: 100%;
      display: block;
      height: auto;
      max-width: 100%;
    }
  }
}

// 轮播展示中的多媒体展示
.img-box {
  width: 120px;
  height: 70px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &:hover .img-box-modal {
    transform: translateY(100%);
  }
  // 蒙版
  .img-box-modal {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    > i {
      color: white;
      font-size: 25px;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .img-box-mp4 {
    height: 50px;
  }
  .img-box-img {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  > img {
    display: block;
    object-position: center;
    object-fit: contain;
  }
}
// 查看大图
.show-image {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 450px;
    height: 450px;
    display: block;
    object-fit: contain;
    object-position: center;
  }
  video {
    width: 450px;
  }
}
</style>