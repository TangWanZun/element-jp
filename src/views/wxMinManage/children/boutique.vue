<template>
  <div>
    <div class="body">
      <el-card>
        <div slot="header" class="clearfix">
          <el-button icon="el-icon-plus" style="padding:10px 15px" type="primary" @click="dialogVisible=true">添加新车型</el-button>
        </div>
        <div class="list">
          <el-card
            :body-style="{padding:'0px',height: '150px'}"
            class="item"
            shadow="hover"
            v-for="item in 7"
            :key="item"
          >
            <div class="item-box" :style="{'backgroundImage':'url('+itemBg+')'}">
              <div class="item-header" @click="push">
                <div>A系</div>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div class="item-setup">
                <i class="el-icon-setting" @click.stop="dialogVisible=true"></i>
              </div>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
    <!-- 设置与添加车型 -->
    <el-dialog :visible.sync="dialogVisible" width="50%" title="编辑">
      <div class="dialog-body">
        <div class="dialog-update">
          <div>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
          <div>
            <span>只能上传jpg/png文件，且不超过500kb</span>
            <span>最佳分辨率 300 * 150</span>
          </div>
        </div>
        <div class="dialog-name">
            车型名称：
            <el-input placeholder="输入车型名称">
            </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "boutique",
  data() {
    return {
      itemBg: require("@/assets/fz/Axc.jpg"),
      //是否显示车型样式
      dialogVisible: false
    };
  },
  methods:{
    /**
     * 点击传递
     */
    push(){
      this.$router.push('/wxMinManage/classify');
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  padding: 15px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 300px;
  margin-right: 15px;
  margin-bottom: 15px;
  .item-box {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    padding-top: 15px;
    position: relative;
    .item-header {
      display: flex;
      justify-content: space-between;
      padding: 5px 15px;
      position: relative;
      font-size: 15px;
      color: white;
      cursor: pointer;
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: #3b76d8;
      }
    }
    .item-setup {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 25px;
      color: white;
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}
//打开创建车系
.dialog-body {
  //上传文件
  .dialog-update {
    display: flex;
    justify-content: space-between;
    > div {
      &:first-child {
        margin-right: 20px;
      }
      &:last-child {
        flex-grow: 1;
        color: rgba(0, 0, 0, 0.5);
        > span {
          display: block;
        }
      }
    }
  }
  //车型名称
  .dialog-name{
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>