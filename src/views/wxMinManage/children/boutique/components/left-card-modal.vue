<template>
  <div>
    <!-- 精品详情 -->
    <el-dialog
      title="编辑"
      :visible.sync="meValue"
      width="400px"
      custom-class="classifyModal-dialog-class"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-body">
        <el-form label-position="left" ref="form" :model="form" label-width="110px" size="mini">
          <!-- <el-form-item label="精品图片">
			  <uploadImg></uploadImg>
          </el-form-item>-->
          <el-form-item label="精品分类名称">
            <el-input v-model="form.DocJson.Name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
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
      meValue: false,
      //大图图片
      form: {
        DocType: "ItemGroup",
        ActionType: "AddOrUpdate",
        UnionGuid: "",
        UnionGuidTemp: "",
        DocJson: {
          Name: ""
        }
      }
    };
  },
  methods: {
    /**
     * 显示
     * 系统页面初始化
     */
    show(data) {
      this.meValue = true;
    },
    /**
     * 保存
     */
    submit() {
      let guid = uuidv1();
      this.form.UnionGuid = guid;
      this.form.UnionGuidTemp = guid;
      this.$request({
        url: "/DoAction/Submit",
        data: this.form
      })
        .then((res)=>{
          this.$emit('on-upload',res)
          this. close();
        })
    },
    /**
     * 页面关闭
     */
    close() {
      //数据初始化
      Object.assign(this.$data, this.$options.data());
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
  // height: 220px;
}
</style>