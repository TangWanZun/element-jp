<template>
  <div @click="clickItem">
    <el-input
      v-if="isEdit"
      ref="input"
      v-model="rowData"
      size="mini"
      placeholder="请输入内容"
      @blur="inputBlur"
    ></el-input>
    <span v-else style="margin-left: 10px">{{rowData}}</span>
  </div>
</template>

<script>
export default {
  name: "TableEditItem",
  props: {
    scope: Object
  },
  watch: {
    scope: {
      immediate: true, 
      handler(val) {
		this.rowData = val.row[val.column.property];
      }
    },
    rowData(val) {
      this.$emit("change", {
        scope: this.scope,
        value: val
      });
    }
  },
  data() {
    return {
      //是否为编辑模式
      isEdit: false,
      //当前的数据
      rowData: ""
    };
  },
  methods: {
    /**
     * 点击项目的时候
     * 进入编辑模式
     */
    clickItem() {
      //进入编辑模式
      this.isEdit = true;
      //让input获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    /**
     * 当input失去焦点的时候
     */
    inputBlur() {
      this.isEdit = false;
      this.$emit("change", {
        scope: this.scope,
        value: this.rowData
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>
