<template>
 <div class="login">
     <div class="login-wrap">
         <ul class="menu-tab">
             <!-- <li class="active" v-for=" (item,index)  in menuTab" :key="item.id">{{index}}</li> -->
             <!-- <li :class="{'active':isActive,'sort':2}" v-for=" item in menuTab" :key="item.id">{{item.txt}}</li> -->
             <!-- <li :class="{'active':isActive==index}" v-for=" (item,index) in menuTab" :key="item.id">{{item.txt}}</li> -->
             <!-- toggleMeun表示切换菜单 -->
             <li :class="{'active':item.active}" v-for=" item in menuTab" :key="item.id" @click="toggleMeun(item)">{{item.txt}}</li>
         </ul>
         <!-- 表单代码 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm login-form">
        <el-form-item prop="username" class="item-form">
            <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
            <label>密码</label>
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="2" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item  prop="passwordtwo" v-if="model === 'register'">
            <label>重复密码</label>
            <el-input type="text" v-model="ruleForm.passwordtwo" autocomplete="off" minlength="2" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
            <label>验证码</label>
            <el-row :gutter="20">
                <el-col :span="16">
                      <el-input v-model.number="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="8">
                     <el-button type="success" round   minlength="6" maxlength="6" @click="getCode()">获取验证码</el-button>
                </el-col>
            </el-row>
          
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="block login-btn" v-bind:disabled="loginButtonStatus">{{model === 'login'?"登录":"注册"}}</el-button>
        </el-form-item>
        </el-form>
     </div>
 </div>
</template>
<script>
//node_vue\vue-admin\src\utils\validate.js
import  { stripscript,validateEmail }  from  '@/utils/validate';
import {reactive,ref,isRef, toRefs,onMounted} from '@vue/composition-api';

import axios from "axios";
//引入 请求的接口文件js
import {getSms} from  '@/api/login';
export default {
  name: "login",
  //setup 放置data数据,生命周期,自定义函数
  //两个参数
  setup(props,context){
      /**表达的校验函数 */
     //表单的校验方法
      var validateUsername = (rule, value, callback) => {
        let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!validateEmail(value)){
          callback(new Error('邮箱格式不正确'));
        }else{
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        ruleForm.password =  stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));

        }  else {
          callback();
        }
      };
      var validatePasswordtwo = (rule, value, callback) => {
        if(model.value === 'login'){ callback()}
        ruleForm.password =  stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请再次输入密码'));

        }  else if(value!= ruleForm.password ){
          callback(new Error('两次密码不一致'));
        }else {
          callback();
        }
      };
      var checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else{
          callback();
        }
      };

    /**声明data数据
     * 
     */
    //表单绑定的数据
    const ruleForm = reactive ({
      username: '',
      password: '',
      passwordtwo:'',
      code: ''
    })
    //表单的检验规则
     const rules = reactive( {
        // 验证规则和触发方式
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        //passwordtwo
        passwordtwo: [
          { validator: validatePasswordtwo, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      })

    //使用reactive 表示对象类型
    const menuTab  = reactive( [
            {txt:'登录',active:true,type:'login'},
            {txt:'注册',active:false,type:'register'}
        ])
    console.log(menuTab)
    //使用ref 表示基本数据类型
    const model = ref('login')
    //登录按钮禁用状态表示符号
    const loginButtonStatus = ref(true);
    //ref表示基本数据的值,必须使用.value才能取出值
    console.log(model.value)
    //判断是不是基本数据类型
    console.log(isRef(model)? true : false) //返回true
    const obj = reactive({
      name : 'foo',
      age : 2
    })
    //把对象类型转化为普通数据类型
    //进行运算和比较
    const aa = toRefs(obj)
    console.log(aa.age.value)
    /**
     * 声明函数
     * 表示登录,注册相互点击切换的函数
     */

     //使用的方法, 登录和注册切换的方法数据驱动视图
    const toggleMeun = (data =>{
      console.log(data)
      menuTab.forEach(elem=>{
            //循环,都置位false
            elem.active = false;
        })
        //点击的那个置位true
        //高光
        data.active = true;
        //console.log(data)
        //修改数据model的值
        model.value = data.type;
        //this.$refs[ruleForm].resetFields(); 2.0的写法
        //重置输入框的值
        //context.refs.ruleForm.resetFields(); //3.0的写法
        context.refs['ruleForm'].resetFields(); //3.0的写法
    })
    /** 
     * 声明函数
     * 表示获取验证码的函数
     */
    const getCode = (()=>{
      //判断邮箱和密码是不是为空
      if(ruleForm.username===""){
        context.root.$message.error('邮箱不能为空');
        return false;
      }
      if(!validateEmail(ruleForm.username)){
         context.root.$message.error('邮箱格式错误');
        return false;
      }
      //cr=code&a=getcode&id=6&py=chongqing&icon=1
      // let data = {
      //   //username : ruleForm.username,
      //   c:"code",
      //   a: "getcode",
      //   id: 6,
      //   py: "chongqing",
      //   icon: 1
        
      // }
      let data = {
        username: ruleForm.username,
        moudle:model.value
      }
      getSms(data).then(response=>{}).catch(error=>{console.log("错误信息"+error)})
    })
    /** 
     * 声明函数
     * 表单提交的函数
     */

    const submitForm = (formName => {
      // axios.get('/user?ID=12345')
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
        axios.request({
            method: 'post',
            url: '/user/12345',
            data: {
              firstName: 'Fred',
              lastName: 'Flintstone'
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
         
      //js校验
      context.refs[formName].validate((valid) => {
      //this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          //this.$refs[formName].resetFields();
          return false;
        }
      })
    }) 
     /**声明周期
      * 挂载完成后
      */
    onMounted(()=>{
      //挂载完成就访问接口文件
      // getSms();
    })
    return {
      menuTab,
      model,
      loginButtonStatus,
      ruleForm,
      rules,
      toggleMeun,
      submitForm,
      getCode
    }
  },
  components: {
  },

  created(){
   
  },
  //挂载完成后
  mounted(){},
  methods:{},
  props:{},
  wathc:{}
};
</script>
<style lang="scss" scoped>
.login{
    height: 100vh;
    background-color: #344a5f;
    .login-wrap {
    width: 330px;
    margin: auto;
}
}
// 是编译的问题吗,我把 login-wrap  放在#login下面为啥不行呢

.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .active{
        background-color: rgba(0, 0, 0, 0.1);
    }
            
}
.login-form{
    margin-top: 29px;
    label{
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 3px;
    }
}
.item-form{
    margin-bottom: 13px;
}
.block{
    display: block;
    width: 100%;
}



</style>
