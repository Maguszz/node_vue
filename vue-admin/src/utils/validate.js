
/**
 * 过滤特殊字符串
 */

export function stripscript(s) { 
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
    var rs = ""; 
    for (var i = 0; i < s.length; i++) { 
    rs = rs+s.substr(i, 1).replace(pattern, ''); 
    } 
    return rs; 
}

export function validateEmail(s) { 
    let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    console.log('格式验证'+reg.test(s));
    return reg.test(s); 
}



/** 
 *  没有使用 export  default,可以使用多个export
 *  文件引入import 使用{}
 */