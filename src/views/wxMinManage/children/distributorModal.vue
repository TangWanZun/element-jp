<template>
  <div>
    <!-- 鹏龙经销商详情 -->
    <el-dialog
      custom-class="distributorModal-dialog-class"
      title="编辑"
      :visible.sync="meValue"
      :show-close="false"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-body">
        <el-tabs v-model="tabs">
          <el-tab-pane label="基本信息" name="tabs-1">
            <el-form label-position="left" ref="form" :model="form" label-width="90px" size="mini">
              <el-form-item label="经销商图片">
                <uploadImg @on-upload=" form.DocJson.ImgUrl=$event" :imgUrl="form.DocJson.ImgUrl"></uploadImg>
              </el-form-item>
              <el-form-item label="经销商名称">
                <el-input v-model="form.DocJson.Name"></el-input>
              </el-form-item>
              <el-form-item label="经销商电话">
                <el-input type="number" v-model="form.DocJson.Phone"></el-input>
              </el-form-item>
              <el-form-item label="门店介绍">
                <el-input type="textarea" v-model="form.DocJson.Descript"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- <el-tab-pane label="门店介绍" name="tabs-3">
            <div id="wangEditor"></div>
          </el-tab-pane> -->
          <el-tab-pane label="地理位置" name="tabs-2">
            <el-form label-position="left" ref="form" :model="form" label-width="80px" size="mini">
              <el-form-item label="检索地址">
                <!-- <el-input v-model="form.address" @change="addressChange"></el-input> -->
                <el-select
                  v-model="form.DocJson.AddressName"
                  placeholder="请填写经销商位置"
                  style="width:100%"
                  :filterable="true"
                  :remote="true"
                  :loading="selectLoading"
                  :remote-method="addressRemote"
                  :clearable="true"
                  @change="addressChange"
                >
                  <el-option
                    v-for="item in selectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item._index"
                  >
                    <span style="float: left">{{item.name}}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.address }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <div class="address-body">
                <div class="address-map" id="containermap"></div>
                <div>
                  <el-form-item label="经度" label-width="50px">
                    <el-input v-model="form.DocJson.Longitude" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="纬度" label-width="50px">
                    <el-input v-model="form.DocJson.Latitude" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="详细地址" label-width="50px">
                    <el-input type="textarea" :rows="5" v-model="form.DocJson.AddressDetails"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="submitLoad" type="primary" @click="submit">保 存</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uuidv1 from "uuid/v1";
import uploadImg from "@/components/upload-img";
import { FILE_URL, IMG_URL } from "@/config";
import wangeditor from "wangeditor";
export default {
  name: "distributorModal",
  props: {},
  components: {
    uploadImg
  },
  data() {
    return {
      meValue: this.value,
      //按钮是否在上传中
      submitLoad: false,
      //是否添加条目
      addItemShow: false,
      //是否显示页面
      meValue: false,
      //当前tables 页签展示
      tabs: "tabs-1",
      //表单数据
      form: {
        DocType: "Dealer",
        ActionType: "AddOrUpdate",
        UnionGuid: "",
        UnionGuidTemp: "",
        DocJson: {
          Name: "", //名称
          Descript: "", //门店介绍
          ImgUrl: "", //图片
          Phone: "", //电话
          Longitude: "", //经度
          Latitude: "", //纬度
          AddressName: "", //地址简称
          AddressDetails: "" //地址详情
        }
      },
      //索引地址列表
      selectList: [],
      //索引地址loading
      selectLoading: false,
      //编辑器
      editor: {},
      //地图
      txMap: {},

      //地图覆盖物
      marker: {},
      //检索服务实例
      searchService: {},
      //当前是否为新增状态
      addState: true
    };
  },
  methods: {
    /**
     * 页面开启
     */
    show(data) {
      this.meValue = true;
      //产生一个GUID
      let guid = uuidv1();
      //判断是新增还是修改
      if (!data) {
        //新增
        this.addState = true;
        this.form.UnionGuidTemp = guid;
        this.form.UnionGuid = guid;
      } else {
        //修改
        this.addState = false;
        //赋值数据
        this.form.DocJson = data;
        this.form.DocId = data.DocId;
        this.form.UnionGuid = data.UnionGuid;
        this.form.UnionGuidTemp = guid;
      }
      this.$nextTick(() => {
        //创建富文本编辑器
        // this.createEditor();
        //创建腾讯地图
        this.createMap();
        //创建检索系统
        this.createSearchService();
      });
    },
    /**
     * 页面关闭
     */
    close() {
      //数据初始化
      Object.assign(this.$data, this.$options.data());
    },
    /**
     * 页面保存
     */
    submit() {
      //将编辑器的内容添加到页面重
      // let data = Object.assign(this.form.DocJson, {
      //   Descript: this.editor.txt.html()
      // });
      this.submitLoad = true;
      this.$request({
        url: "/DoAction/Submit",
        data: this.form
      })
        .then(res => {
          // //console.log("res", res);
          this.$emit("on-upload", res);
          this.close();
        })
        .finally(() => {
          this.submitLoad = false;
        });
    },
    /**
     * 检索框数据发生变化
     */
    addressRemote(value) {
      //启动loading
      this.selectLoading = true;
      //console.log('检索框数据发生变化',value);
      //进行查询
      this.searchService.search(value);
    },
    /**
     *检索框获取当前选中值
     */
    addressChange(val) {
      //console.log('检索框获取当前选中值',val)
      // if (!val) {
      //   return;
      // }
      if (typeof val == "object") {
        return;
      }
      //获取选中项信息
      let item = this.selectList[val];
      // //console.log(item)
      //更新经纬度item
      this.form.DocJson.Longitude = item.latLng.lng;
      this.form.DocJson.Latitude = item.latLng.lat;
      //更新详细地址
      this.form.DocJson.AddressDetails = item.address + item.name;
      //更新简单地址
      this.form.DocJson.AddressName = item.name;
      //修改当前覆盖点的位置
      this.marker.setPosition(item.latLng);
      //更改地图中间位置
      this.txMap.setCenter(item.latLng);
    },
    /**
     * 创建富文本编辑器
     */
    createEditor() {
      //首先清除之前的文本编辑器
      document.querySelector("#wangEditor").innerHTML = "";
      //创建编辑器
      this.editor = new wangeditor("#wangEditor");
      //开启debug模式
      this.editor.customConfig.debug = true;
      // 配置服务器端地址
      this.editor.customConfig.uploadImgServer = FILE_URL;
      //添加自定义参数
      this.editor.customConfig.uploadImgParams = {
        docType:'Dealer'
      };
      //上传图片的配置
      this.editor.customConfig.uploadImgHooks = {
        //自定义上传图片
        customInsert: function(insertImg, result, editor) {
          console.log(result);
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          // var url = result.url;
          insertImg(IMG_URL+result.Data);
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };
      this.editor.create();
      //对富文本编辑器进行赋值
      this.editor.txt.html(this.form.DocJson.Descript);
    },
    /**
     * 创建腾讯地图
     */
    createMap() {
      var _this = this;
      //1.创建坐标  为天安门
      let lng = this.form.DocJson.Longitude || 116.397128;
      let lat = this.form.DocJson.Latitude || 39.916527;
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
        _this.form.DocJson.Longitude = event.latLng.lng;
        _this.form.DocJson.Latitude = event.latLng.lat;
      });
      //4.创建一个覆盖物到当前天安门点
      this.marker = new qq.maps.Marker({
        position: location,
        map: map,
        //可以拖动
        draggable: true,
        //设置Marker被添加到Map上时的动画效果为反复弹跳
        animation: qq.maps.MarkerAnimation.BOUNCE
      });
      //5.设置Marker停止拖动事件
      qq.maps.event.addListener(_this.marker, "dragend", function(event) {
        //修改当前覆盖点的位置
        _this.marker.setPosition(event.latLng);
        //将经纬度赋值为input
        _this.form.DocJson.Longitude = event.latLng.lng;
        _this.form.DocJson.Latitude = event.latLng.lat;
      });
    },
    /**
     * 创建地图检索服务
     */
    createSearchService() {
      let _this = this;
      //设置Poi检索服务，用于本地检索、周边检索
      this.searchService = new qq.maps.SearchService({
        //设置搜索范围为北京
        location: "北京",
        //设置搜索页码为1
        pageIndex: 1,
        //设置每页的结果数为10
        pageCapacity: 10,
        //设置展现查询结构到infoDIV上
        // panel: document.getElementById("infoDiv"),
        //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
        autoExtend: true,
        //检索成功的回调函数
        complete: function(results) {
          // //console.log(results);
          let list = results.detail.pois;
          for (let i = 0; i < list.length; i++) {
            list[i]._index = i;
          }
          _this.selectList = list;
          //结束loading
          _this.selectLoading = false;
        },
        //若服务请求失败，则运行以下函数
        error: function(error) {
          //console.log("error", error);
          //结束loading
          _this.selectLoading = false;
        }
      });
    }
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
