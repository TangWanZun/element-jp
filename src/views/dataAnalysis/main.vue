<template>
  <div class="page-body">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
        	<div class="echarts" id="echarts3"></div>
		</el-card>
      </el-col>
	  <el-col :span="12">
        <el-card>
        	<div class="echarts" id="echarts4"></div>
		</el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
        	<div class="echarts" id="echarts2"></div>
		</el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
        	<div class="echarts" id="echarts"></div>
		</el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapUserCountOption,followOption,JXSGZDoption,ZZToption } from "./public/echartsOption";
export default {
  name: "dataAnalysis",
  mounted: function() {
    this.$nextTick(function() {
      // 每日小程序点击量统计
      echarts.init(document.getElementById("echarts")).setOption(mapUserCountOption);;
	  //车系关注度
      echarts.init(document.getElementById("echarts3")).setOption(followOption);;
	  //经销商关注度
	  echarts.init(document.getElementById("echarts2")).setOption(JXSGZDoption);
	  //柱状图
      echarts.init(document.getElementById("echarts4")).setOption(ZZToption);
    });
  }
};
</script>
<style lang="less" scoped>
.page-body {
  padding: 20px;
}
.echarts {
  height: 500px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>