<template>
  <div>
    <div class="body">
      <div class="header">
        <el-button type="primary" icon="el-icon-edit">保存修改</el-button>
	  </div>
      <div class="content">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>配置信息</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-form label-width="100px">
            <el-form-item label="归属公司">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="原始ID">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="AppId">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="AppSecret">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="支付商号">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="支付KEY">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="是否禁用" prop="delivery">
              <el-switch v-model="form.disabled" size="small"></el-switch>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>运行信息</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-form label-width="100px">
            <el-form-item label="状态码">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="原因">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="授权令牌">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="JS令牌">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="域名">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="运行于">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="成功运行于">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="倒计时" prop="delivery">
              <el-input v-model="form.name" disabled size="small"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>第三方接口</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-form label-width="100px">
            <el-form-item label="星云ID">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="星云KEY">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemSetup",
  data() {
    return {
      form: {
        name: "1",
        //是否禁用
        disabled: false
      }
    };
  },
  methods: {
    /**
     * 保存按钮
     */
    onSubmit() {}
  }
};
</script>

<style lang="less" scoped>
@import url(../../main.less);
.body {
  display: flex;
  flex-direction: column;
  height: ~'calc( 100vh - @{app-header-height} )';
  .header {
    height: 50px;
	background-color: #f5f5f5;
	    border-bottom: 1px solid #d9d9d9;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	padding:0 20px;
	justify-content: flex-end;
  }
  .content {
	flex-wrap: 1;
	overflow: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }
}
.box-card {
  margin-bottom: 20px;
  width: ~"calc( 50% - 20px )";
  flex-shrink: 0;
  margin-right: 20px;
  &:nth-child(2) {
    margin-right: 0px;
  }
}
</style>