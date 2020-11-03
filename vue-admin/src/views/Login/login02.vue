<template>
 <div class="login">
     <div class="login-wrap">
         <ul class="menu-tab">
             <!-- <li class="active" v-for=" (item,index)  in menuTab" :key="item.id">{{index}}</li> -->
             <!-- <li :class="{'active':isActive,'sort':2}" v-for=" item in menuTab" :key="item.id">{{item.txt}}</li> -->
             <!-- <li :class="{'active':isActive==index}" v-for=" (item,index) in menuTab" :key="item.id">{{item.txt}}</li> -->
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
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="2" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
            <label>验证码</label>
            <el-row :gutter="20">
                <el-col :span="16">
                      <el-input v-model.number="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="8">
                     <el-button type="success" round   minlength="6" maxlength="6">获取验证码</el-button>
                </el-col>
            </el-row>
          
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="block login-btn">提交</el-button>
        </el-form-item>
        </el-form>
     </div>
 </div>
</template>
<script>
//node_vue\vue-admin\src\utils\validate.js
import  { stripscript }  from  '@/utils/validate';
export default {
  name: "login",
  components: {
  },
  data(){
      var validateUsername = (rule, value, callback) => {
        let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!reg.test(value)){
          callback(new Error('邮箱格式不正确'));
        }else{
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        this.ruleForm.password =  stripscript(value);
        value = this.ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));

        }  else {
          callback();
        }
      };
      //validatePasswordtwo
       var validatePasswordtwo = (rule, value, callback) => {
        this.ruleForm.password =  stripscript(value);
        value = this.ruleForm.password;
        if (value === '') {
          callback(new Error('请再次输入密码'));

        }  else if(value!= this.ruleForm.password ){
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
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
    return {
        menuTab : [
            {txt:'登录',active:true,type:'login'},
            {txt:'注册',active:false,type:'register'}
        ],
        model:'login',
        isActive:true,
        ruleForm: {
          username: '',
          password: '',
          passwordtwo:'',
          code: ''
        },
        rules: {
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
        }
    }
  },
  created(){},
  //挂载完成后
  mounted(){},
  methods:{
      //数据驱动视图
      toggleMeun(data){
          this.menuTab.forEach(elem=>{
              //循环,都置位false
              elem.active = false;
          })
          //点击的那个置位true
          data.active = true;
          //console.log(data)
          //修改数据model的值
          this.model = data.type;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      // ,
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
  },
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
