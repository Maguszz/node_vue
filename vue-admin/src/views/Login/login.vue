<template>
 <div class="lgoin">
     <div class="login-wrap">
         <ul class="menu-tab">
             <!-- <li class="active" v-for=" (item,index)  in menuTab" :key="item.id">{{index}}</li> -->
             <!-- <li :class="{'active':isActive,'sort':2}" v-for=" item in menuTab" :key="item.id">{{item.txt}}</li> -->
             <!-- <li :class="{'active':isActive==index}" v-for=" (item,index) in menuTab" :key="item.id">{{item.txt}}</li> -->
             <li :class="{'active':item.active}" v-for=" item in menuTab" :key="item.id" @click="toggleMeun(item)">{{item.txt}}</li>
         </ul>

     </div>
 </div>
</template>

<script>

export default {
  name: "login",
  components: {
  },
  data(){
    return {
        menuTab : [
            {txt:'登录',active:true},
            {txt:'注册',active:false}
        ],
        isActive:true
    }
  },
  created(){},
  //挂载完成后
  mounted(){},
  methods:{
      //数据驱动视图
      toggleMeun(data){
          console.log(data)
      }
  },
  props:{},
  wathc:{}
};
</script>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
    .login-wrap {
        width: 330px;
        margin: auto;
    }
}
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



</style>
