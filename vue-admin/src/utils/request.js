/**  
 * 引入请求拦截器
 */
import axios from 'axios';
//错误信息提示
import { Message } from 'element-ui';

//创建axios实例,创建实例的请求基本配置
//这里baseURL改成自己的地址
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
const service = axios.create({
  //http://127.0.0.1:8081/web/vueLoginServlet
  baseURL: BASEURL,
  timeout: 1000
  // headers: {'X-Custom-Header': 'foobar'}
});
//配置开发环境下的配置变量
console.log(process.env.VUE_APP_TITLE);
console.log(process.env.NODE_ENV);
console.log(BASEURL);

// 为实例添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 为实例添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('开始拦截响应的返回值');
    console.log(response);
    let data = response.data;
    if(data.code!==200){
        Message.warning(data.message)
        //错误信息返回
        return Promise.reject(data);
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default service;
/** 
 *  使用 export default时,不能使用多个default,
 *  文件引入import 不使用{}
 */