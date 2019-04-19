<template>
  <div>
    <div class="upload-img">
      <div class="upload-img-show" v-if="meImgUrl">
        <img :src="meImgUrl" alt srcset>
        <div class="upload-img-btn">
          <i class="el-icon-zoom-in" @click="bigImage"></i>
          <i class="el-icon-delete"></i>
        </div>
      </div>
      <el-upload
        v-else
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus upload-img-icon"></i>
      </el-upload>
    </div>
    <!-- 用于查看大图的 -->
    <el-dialog :visible.sync="bigImageShow" append-to-body>
      <img :src="meImgUrl" style="width:100%" alt>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "uploadImg",
  props: {
    imgUrl: {
      type: String
    }
  },
  data() {
    return {
      bigImageShow: false,
      meImgUrl: this.imgUrl
    };
  },
  watch: {
    imgUrl(val) {
      this.meImgUrl = val;
    }
  },
  methods: {
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
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 上传之前
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
