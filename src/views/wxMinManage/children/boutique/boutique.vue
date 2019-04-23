<template>
  <div style="height:100%">
    <div class="body">
      <!-- 精品系列 -->
      <leftCard class="left-card" @row-click="rowClick"></leftCard>
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
     * 单击系列信息行信息的时候
     */
    rowClick(row, column, event){
      // console.log(row)
      //更新右侧精品详情的信息
      this.$refs.rightCard.dataShow(row.id);
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
// 用于展示精品系列
.left-card {
  width: 500px;
  height: 100%;
}
//展示相应的精品
.right-card {
  margin-left: 20px;
  height: 100%;
  flex-grow: 1;
}
</style>