<template>
  <div>
    <!-- 修改密码 -->
    <el-dialog
      title="编辑"
      :visible.sync="meValue"
      width="500px"
      custom-class="classifyModal-dialog-class"
      :show-close="false"
      :close-on-click-modal="false"
      @close="close"
    >
      <div class="dialog-body">
        <el-form label-width="80px" hide-required-asterisk>
          <el-form-item label="原始密码">
            <el-input v-model="form.oldPsw" size="small" show-password></el-input>
          </el-form-item>
          <el-form-item label="新的密码">
            <el-input v-model="form.newPsw1" size="small" show-password></el-input>
          </el-form-item>
          <el-form-item label="确定密码">
            <el-input v-model="form.newPsw2" size="small" show-password></el-input>
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
import TableEditItem from "@/components/table-edit-item";
export default {
  name: "changePassword",
  components: {
    TableEditItem
  },
  props: {},
  data() {
    return {
      meValue: false,
      subLoading: false,
      form: {
        oldPsw: "",
        newPsw1: "",
        newPsw2: ""
      }
    };
  },
  computed: {},
  methods: {
    /**
     * 显示
     * 系统页面初始化
     */
    show(data) {
      this.meValue = true;
    },
    /**
     * 页面关闭
     */
    close() {
      //数据初始化
      Object.assign(this.$data, this.$options.data());
    },
    /**
     * 提交数据
     */
    submit() {
      if (this.form.newPsw1 !== this.form.newPsw2) {
        this.$message.error("新的密码与确认密码不一致");
        return;
      }
      this.subLoading = true;
      this.$request({
        url: "/pc/Login/ModifyPsw",
        data: {
          oldPsw: this.form.oldPsw,
          newPsw: this.form.newPsw2
        }
      }).then(res => {
        this.$notify({
          title: '成功',
          message: '密码修改成功，请重新登录',
          type: 'success'
        });
        //这里执行退出登录操作
        this.$store.dispatch('user/userLoginOut');
        this.$router.push("/Loading/index");
      })
      .finally(()=>{
        this.subLoading = false;
      })
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
</style>