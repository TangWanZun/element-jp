<template>
  <div style="height:100%">
    <div class="body">
      <!-- 精品分类 -->
      <leftCard class="left-card" @on-upload="leftOnUpload" @row-click="rowClick"></leftCard>
      <!-- 精品详情 -->
      <rightCard class="right-card" ref="rightCard"> </rightCard>
    </div>
  </div>
</template>

<script>
import leftCard from './components/left-card.vue'
import rightCard from './components/right-card.vue'
export default {
  components: {
    leftCard,
    rightCard
  },
  methods:{
    /**
     * 当左侧数据加载完成的时候
     */
    leftOnUpload(){
      //默认点击全部分类
      this.rowClick();
    },
    /**
     * 单击分类信息行信息的时候
     */
    rowClick(row, column, event){
      //更新右侧精品详情的信息
      this.$refs.rightCard.dataShow(Object.assign({},row));
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  padding: 15px;
  height: 100%;
  display: flex;
}
// 用于展示精品分类
.left-card {
  width: 280px;
  height: 100%;
}
//展示相应的精品
.right-card {
  margin-left: 10px;
  height: 100%;
  flex-grow: 1;
}
</style>