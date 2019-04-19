import axios from "axios";
import qs from 'qs';
import store from '@/vuex/store'
const request = function (para) {
  var mepara = {
    url: `/${store.state.wxId}${para.url}` || '',
    para: para.para ? qs.stringify(para.para) : {},
    success: para.success || function (response) { console.log(response) },
    fail: para.fail || function (response) { },
    complete: para.complete || function (response) { },
    root: (typeof para.root == 'undefined') ? false : para.root,
  }
  axios.post(mepara.url, mepara.para)
    .then(function (response) {
      var ponse = response.data;
      if (response.status === 200 ) {
        if(ponse.errcode){
          mepara.complete(ponse);
          return;
        }
        // if(ponse.errorcode)
        if (ponse.success) {
          //判断当存在root时,返回root根数据
          if (mepara.root) {
            mepara.success(ponse);
          } else {
            mepara.success(ponse.data || ponse);
          }
        } else {
          $tui.error(ponse.msg);
          mepara.fail(ponse);
        }
      } else {
        $tui.error(ponse.msg);
      }
      mepara.complete(ponse);
    })
    .catch(function (error) {
      //这里出现错误属于500
      $tui.error(error);
      // mepara.fail(error);
    });
}