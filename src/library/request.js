import axios from "axios";
// import qs from 'qs';
import store from '@/store'
import { REQUEST_URL } from '@/config';
import { Message } from 'element-ui';
import { Notification } from 'element-ui';
export const request = function ({
  //API接口链接
  url = "",
  data = {},
  //当出现问题时候是否展示错误的信息
  isErrorShow=true
} = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${REQUEST_URL}${url}`,
      headers:{
        'Content-Type':'application/json',
        //添加访问令牌
        // 'Cookie':store.state.user.rsid
      },
      data
    })
      .then((response) => {
        let resData = response.data;
        if(response.status==200){
          if(resData.Code==0){
            //正确情况
            resolve(resData.Data)
          }else
          if(resData.Code==="40001"){
            //表示当前登录用户已经失效需要重新登录
            /*if(isErrorShow){
              Notification.warning({
                title:'警告',
                message:"当前登录用户已经失效请重新登录"
              })
            }*/
            this.$router.push("/Loading/index");
            reject(resData)
          }else{
            //服务器200  但数据报错的时候
            if(isErrorShow)Message.error(resData.Msg)
            reject(resData)
          }
        }
        // //console.log(response)
      })
      .catch((error) => {
        //访问url报错，比如 404
        if(isErrorShow)Message.error(error.toString())
        reject(error)
        //console.log(error)
      })
  })

}
// const request = function (para) {
//   var mepara = {
//     url: `/${store.state.wxId}${para.url}` || '',
//     para: para.para ? qs.stringify(para.para) : {},
//     success: para.success || function (response) { //console.log(response) },
//     fail: para.fail || function (response) { },
//     complete: para.complete || function (response) { },
//     root: (typeof para.root == 'undefined') ? false : para.root,
//   }
//   axios.post(mepara.url, mepara.para)
//     .then(function (response) {
//       var ponse = response.data;
//       if (response.status === 200) {
//         if (ponse.errcode) {
//           mepara.complete(ponse);
//           return;
//         }
//         // if(ponse.errorcode)
//         if (ponse.success) {
//           //判断当存在root时,返回root根数据
//           if (mepara.root) {
//             mepara.success(ponse);
//           } else {
//             mepara.success(ponse.data || ponse);
//           }
//         } else {
//           $tui.error(ponse.msg);
//           mepara.fail(ponse);
//         }
//       } else {
//         $tui.error(ponse.msg);
//       }
//       mepara.complete(ponse);
//     })
//     .catch(function (error) {
//       //这里出现错误属于500
//       $tui.error(error);
//       // mepara.fail(error);
//     });
// }