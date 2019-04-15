<template>
  <div>
    <!-- 鹏龙经销商详情 -->
    <el-dialog
      custom-class="distributorModal-dialog-class"
      title="修改"
      :visible.sync="meValue"
      :show-close="false"
      width="700px"
    >
      <div class="dialog-body">
        <el-tabs v-model="tabs">
          <el-tab-pane label="基本信息" name="tabs-1">
            <el-form label-position="left" ref="form" :model="form" label-width="90px" size="mini">
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
          <el-tab-pane label="地理位置" name="tabs-2">
            <el-form label-position="left" ref="form" :model="form" label-width="80px" size="mini">
              <el-form-item label="检索地址">
                <el-select v-model="form.address" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in selectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div class="address-body">
                <div class="address-map" id="containermap"></div>
                <div>
                  <el-form-item label="经度" label-width="50px">
                    <el-input v-model="form.lng" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="维度" label-width="50px">
                    <el-input v-model="form.lat" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="详细地址" label-width="50px">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">保 存</el-button>
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
      //当前tables 页签展示
      tabs: "tabs-1",
      //表单数据
      form: {
        name: "",
        phone: "",
        desc: "",
        imageUrl: "",
        //地址
        address: "",
        lng:116.397128,
        lat:39.916527,
      },
      //索引地址列表
      selectList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      //地图
      txMap: {},
      //地图覆盖物
      marker:{}
    };
  },
  // created() {
  //   this.show();
  // },
  methods: {
    /**
     * 页面开启
     */
    show() {
      this.meValue = true;
      this.$nextTick(() => {
        //创建腾讯地图
        this.createMap();
      });
    },
    /**
     * 页面关闭
     */
    close(){
      //数据初始化
      Object.assign(this.$data, this.$options.data())
    },
    /**
     * 创建腾讯地图
     */
    createMap() {
      var _this = this;
      //1.创建坐标  为天安门
      let lng = 116.397128;
      let lat = 39.916527;
      //获取放置地图的dom
      var mapDom = document.querySelector("#containermap");
      //创建一个坐标
      var location = new qq.maps.LatLng(lat, lng);
      //2.创建地图组件
      var map = new qq.maps.Map(mapDom, {
        // 地图的中心地理坐标。
        center: location,
        zoom: 15
      });
      this.txMap = map;
      //3.绑定单击事件添加参数
      qq.maps.event.addListener(map, "click", function(event) {
        //修改当前覆盖点的位置
        _this.marker.setPosition(event.latLng);
        //将经纬度赋值为input
        _this.form.lng = event.latLng.lng;
        _this.form.lat = event.latLng.lat;
      });
      //创建一个覆盖物到当前天安门点
      this.marker = new qq.maps.Marker({
        position: location,
        map: map,
        //设置Marker被添加到Map上时的动画效果为反复弹跳
        animation: qq.maps.MarkerAnimation.BOUNCE,
      });
    },
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
<style lang="less" scoped>
.dialog-body {
  height: 400px;
}
.address-body {
  display: flex;
  justify-content: space-between;
  // 腾讯地图
  .address-map {
    flex-shrink: 0;
    width: 430px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
