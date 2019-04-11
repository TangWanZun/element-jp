<template>
  <div>
    <!-- 鹏龙经销商详情 -->
    <el-dialog
      custom-class="distributorModal-dialog-class"
      title="修改"
      :visible.sync="meValue"
      width="600px"
    >
      <el-tabs value="base">
        <el-tab-pane label="基本信息" name="base">
          <el-form ref="form" :model="form" label-width="100px" size="mini">
            <el-form-item label="经销商图片">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
				:limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="经销商名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="经销商电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="门店介绍">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="地理位置" name="address">地理位置</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="meValue = false">取 消</el-button>
        <el-button type="primary" @click="meValue = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "distributorModal",
  props: {},
  watch: {},
  data() {
    return {
      meValue: this.value,
      //是否添加条目
      addItemShow: false,
      //是否显示页面
      meValue: false,
      //表单数据
      form: {
        name: "",
        phone: "",
        desc: "",
        imageUrl: ""
      }
    };
  },
  methods: {
    /**
     * 页面客气
     */
    show() {
      this.meValue = true;
    }
  }
};
</script>

<style lang="less">
.distributorModal-dialog-class {
  .el-dialog__body {
    padding: 0px 10px;
  }
}
</style>