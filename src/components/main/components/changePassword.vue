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
        <el-form label-width="80px">
          <el-form-item label="原始密码">
            <el-input v-model="form.name" size="small" show-password></el-input>
          </el-form-item>
          <el-form-item label="新的密码">
            <el-input v-model="form.name" size="small" show-password></el-input>
          </el-form-item>
          <el-form-item label="确定密码">
            <el-input v-model="form.name" size="small" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close" :loading="subLoading">保 存</el-button>
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
        name: ""
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
      //需要传入数据的时候
      //   this.subLoading = true;
      //   setTimeout(() => {
      //     //获取条目编辑的信息
      //     this.tableData = [
      //       {
      //         name: "品牌(ANZ)",
      //         info: "安之享"
      //       },
      //       {
      //         name: "编码采集",
      //         info: "JC-BB-AAS03-DNVJ"
      //       }
      //     ];
      //     this.subLoading = false;
      //   }, 3000);
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
</style>