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
        <el-form label-position="left" ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item label="车系图片">
            <uploadImg :imgUrl="form.DocJson.ImgUrl" @on-upload="form.DocJson.ImgUrl=$event" doc-type="CarSer"></uploadImg>
          </el-form-item>
          <el-form-item label="车系名称">
            <el-input v-model="form.DocJson.Name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" :loading="subLoading">保 存</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import Sortable from "sortablejs";
import uploadImg from "@/components/upload-img";
import uuidv1 from "uuid/v1";
export default {
  name: "classifyModal",
  components: {
    uploadImg
  },
  props: {},
  data() {
    return {
        isUpdate:null,
      meValue: false,
      //是否为添加数据状态
      addState:true,
      //登录按钮loading
      subLoading:false,
      //数据
      form: {
        DocType: "CarSer",
        ActionType: "AddOrUpdate",
        UnionGuid: "",
        UnionGuidTemp: "",
        DocJson: {
          Name: "",
          ImgUrl: ""
        }
      }
    };
  },
  methods: {
    /**
     * 显示
     * 系统页面初始化
     */
    show(data,update) {
        this.isUpdate = update;
      this.meValue = true;
      if(!data){
        //添加状态
        this.addState = true;
      }else{
        //修改状态
        this.addState = false;
        this.form.DocJson = data;
        this.form.UnionGuid = data.UnionGuid;
        this.form.DocId = data.DocId;
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
     * 保存按钮
     */
    submit(){
      this.subLoading = true;
      let guid = uuidv1();
      this.form.UnionGuidTemp = guid;
        let url = this.isUpdate ? "/CarSer/Update" : "/CarSer/Add";
        if(this.isUpdate){
            this.form.DocJson.UnionGuidTemp = uuidv1()
        }
      if(this.addState){
        //添加状态
        this.form.UnionGuid = guid;
      }
      this.$request({
        url:url,
        data:this.form.DocJson
      })
        .then((res)=>{
          this.$emit('on-upload',res)
          this.close();
        })
        .finally(()=>{
          this.subLoading = false
        })
    },
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
  height: 220px;
}
</style>