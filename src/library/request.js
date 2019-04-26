import axios from "axios";
// import qs from 'qs';
import store from '@/store'
import { REQUEST_URL } from '@/config';
import { Message } from 'element-ui';
export const request = function ({
  //API接口链接
  url = "",
  data = {}
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
          if(resData.ErrCode==0){
            //正确情况
            resolve(resData.Data)
          }else{
            //服务器200  但数据报错的时候
            Message.error(resData.ErrMsg)
            reject(resData)
          }
        }
        // console.log(response)
      })
      .catch((error) => {
        //访问url报错，比如 404
        Message.error(error.toString())
        reject(error)
        console.log(error)
      })
  })

}
// const request = function (para) {
//   var mepara = {
//     url: `/${store.state.wxId}${para.url}` || '',
//     para: para.para ? qs.stringify(para.para) : {},
//     success: para.success || function (response) { console.log(response) },
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