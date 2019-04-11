<template>
  <div>
    <!-- 精品详情 -->
    <el-dialog
      title="编辑"
      :visible.sync="meValue"
      width="600px"
      custom-class="classifyModal-dialog-class"
    >
      <div class="dialog-body" v-loading="dialogLoading">
        <div class="dialog-body-left">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :class="{'none-upload':formData.imgUrl}"
            :on-preview="handlePictureCardPreview"
            :limit="1"
            :multiple="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <span>添加封面图片</span>
        </div>
        <div class="dialog-body-right">
          <el-button
            style="padding:8px 15px"
            type="primary"
            round
            v-if="!addItemShow"
            @click="addItemShow = true"
          >
            <i class="el-icon-circle-plus-outline"></i>添加条目
          </el-button>
          <el-card class="box-card" v-else>
            <el-input placeholder="请输入条目名称"></el-input>
            <el-input type="textarea" :rows="2" placeholder="请输入条目内容"></el-input>
            <el-button @click="addItemShow = false">取 消</el-button>
            <el-button type="primary">保 存</el-button>
          </el-card>
          <div class="item-list">
            <div class="item" v-for="item in 5" :key="item">
              <div class="item-title">产品数据</div>
              <div>镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈镜头光圈</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="meValue = false">取 消</el-button>
        <el-button type="primary" @click="meValue = false" :loading="dialogLoading">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="formData.imgUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "classifyModal",
  props: {},
  data() {
    return {
      meValue: false,
      //是否添加条目
      addItemShow: false,
      //loading
      dialogLoading: false,
      //是否打开大图
      dialogVisible: false,
      //大图图片
      formData: {
        imgUrl: ""
      }
    };
  },
  computed:{
    /**
     * 是否隐藏上传按钮
     */
    isNoneUpload(){
      // console.log(1,this.formData.imgUrl)
      // return ?true:false;
    }
  },
  methods: {
    /**
     * 显示
     * 系统页面初始化
     */
    show(data) {
      this.meValue = true;
      // if(data){
      //   //需要传入数据的时候
      //   this.dialogLoading=true;
      //   setTimeout(()=>{
      //     this.dialogLoading=false;
      //   },500)
      // }
    },
    /**
     * 查看大图
     */
    handlePictureCardPreview(file) {
      this.formData.imgUrl = file.url;
      this.dialogVisible = true;
    },
    cardAddBu() {}
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
// 精品详情
.dialog-body {
  display: flex;
  justify-content: flex-start;
  .dialog-body-left {
    width: 180px;
    flex-shrink: 0;
  }
  .dialog-body-right {
    padding-left: 10px;
    flex-grow: 1;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
  }
}
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