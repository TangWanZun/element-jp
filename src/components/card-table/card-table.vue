<template>
  <el-card :body-style="{'padding':0,'height':'100%'}">
    <div class="card-body">
      <div class="card-header">
        <slot name="header"></slot>
      </div>
      <div class="card-main">
        <slot></slot>
      </div>
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "cardTable"
};
</script>

<style scoped lang="less">
//自定义卡片内部
.card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  // 头部
  .card-header {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }
  // 内容
  .card-main {
    padding: 10px;
    padding-bottom: 0px;
    flex-grow: 1;
  }
  // 页脚
  .card-footer {
    flex-shrink: 0;
    padding: 10px;
    padding-bottom: 20px;
  }
}
</style>
