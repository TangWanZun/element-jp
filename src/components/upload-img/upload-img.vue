<template>
  <div>
    <div class="upload-img">
      <div class="upload-img-show" v-if="meImgUrl">
        <img :src="imgRootUrl+meImgUrl" alt srcset>
        <div class="upload-img-btn">
          <i class="el-icon-zoom-in" @click="bigImage"></i>
          <i class="el-icon-delete" @click="deleteImage"></i>
        </div>
      </div>
      <!-- <div v-else>
        <form :action="uploadUrl" method="post" enctype="multipart/form-data">
          <input type="file" name="mediaFile" id="">
          <input type="hidden" name="docType" value="Dealer">
          <button type="submit">上传</button>
        </form>
      </div> -->
      <el-upload
        v-else
        :action="uploadUrl"
         accept="image/png,image/jpeg"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-remove="deleteImage"
        :before-upload="beforeAvatarUpload"
        name="mediaFile"
        :data="data"
        :headers="headers"
        with-credentials
        ref="upload"
      >
        <i class="el-icon-plus upload-img-icon"></i>
      </el-upload>
    </div>
    <!-- 用于查看大图的 -->
    <el-dialog :visible.sync="bigImageShow" append-to-body>
      <img :src="imgRootUrl+meImgUrl" style="width:100%" alt>
    </el-dialog>
  </div>
</template>

<script>
import {FILE_URL,IMG_URL} from '@/config'

export default {
  name: "uploadImg",
  props: {
    imgUrl: {
      type: String,
      default:''
    }
  },
  data() {
    return {
      uploadUrl:FILE_URL,
      bigImageShow: false,
      meImgUrl: this.imgUrl,
      imgRootUrl:IMG_URL,
      //上传图片的头部
      headers:{
        // 'Content-Type':'application/x-www-form-urlencoded',
        // 'Cookie':this.$store.state.user.rsid
      },
      //上传附带的额外参数
      data:{
        docType:'Dealer'
      }
    };
  },
  watch: {
    imgUrl(val) {
      this.meImgUrl = val;
    }
  },
  methods: {
    submit(){
      
      return false
    },
    /**
     * 删除图片
     */
    deleteImage(){
      this.$emit('on-upload','')
    },
    /**
     * 查看大图
     */
    bigImage() {
      this.bigImageShow = true;
    },
    /**
     * 上传成功之后
     */
    handleAvatarSuccess(res, file) {
      //console.log(res);
      if(res.ErrCode==0){
        this.$emit('on-upload',res.Data)
      }
      if(res.ErrCode==1){
        this.$message.error(res.ErrMsg);
        this.$refs.upload.clearFiles();
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 上传之前
     */
    beforeAvatarUpload(file) {
      //console.log('fileType',file.type)
      const isImg =( file.type.indexOf("image") >-1);
      if (!isImg) {
        this.$message.error("请上传图片格式文件");
      }
      return isImg;
    }
  }
};
</script>

<style scoped lang="less">
@uploadImgWidth: 150px;
.upload-img {
  width: @uploadImgWidth;
  height: @uploadImgWidth;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  //   &:hover {
  //     border-color: #409eff;
  //   }
  //照片
  .upload-img-show {
    width: @uploadImgWidth;
    height: @uploadImgWidth;
    object-position: center;
    object-fit: contain;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    &:hover .upload-img-btn {
      transform: translateY(0);
    }
    > img {
      width: @uploadImgWidth;
      height: @uploadImgWidth;
      object-position: center;
      object-fit: contain;
    }
    .upload-img-btn {
      transform: translateY(-@uploadImgWidth - 10);
      transition: 0.1s;
      position: absolute;
      width: @uploadImgWidth;
      height: @uploadImgWidth;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0px;
      left: 0px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 6px;
      > i {
        color: white;
        font-size: 25px;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
  //加号icon
  .upload-img-icon {
    font-size: 28px;
    color: #8c939d;
    width: @uploadImgWidth;
    height: @uploadImgWidth;
    line-height: @uploadImgWidth;
    text-align: center;
  }
}
</style>
