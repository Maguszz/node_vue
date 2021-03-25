import service from "@/utils/request";


/**
 * 验证码接口
 */
export function getSms(data){
    //请求天气接口
    //https://i.tianqi.com/?c=code&a=getcode&id=6&py=chongqing&icon=1
    window.console.log(payload)
//    return  service.request({
//         method: "get",
//         url:"/vueLoginServlet",
//         params:data
//     })
    return  service.request({
                method: "post",
                url:"/vueGetCodeServlet",
                data:data
            })
}

 /** 
  * 登录接口
 */

 /** 
  * 注册接口
 */