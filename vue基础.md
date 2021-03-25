# 项目需要的基础
[TOC]
## vue文件规则
+ template标签
  template在vue文件中必须有,然后下面必须是一个父元素,然后是自己的前端代码
  ```HTML
  <template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>
  ```

+ script标签
```javaScript
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data(){
    return {}
  },
  created(){},
  mounted(){},
  methods:{},
  props:{},
  wathc:{}

};
```
> name :当前的名称
> components: 组件,有组件引入时,放置组件名称
> Data: 数据,v-model绑定数据
> created : 创建完成时(生命周期)
> mounted: 挂载完成时(生命周期)
> methods: 定义函数
> props,watch:子组件接收父组件参数 
  
+ style标签
   lang = scss 定义上style的内容
   scoped 定义样式只会作用于当前文件,表示局部
## vue 基本指令
+ 循环
```
<li class="active" v-for=" (item,index)  in menuTab" :key="item.id">{{index}}</li>
```
```
<li class="active" v-for=" (item,index)  in menuTab" v-bind:key="item.id">{{index}}</li>
```
+ class绑定
  >使用特定参数绑定 isActive sort
  ```
  <li :class="{'active':isActive,'sort':sort}" v-for=" item in menuTab" :key="item.id">{{item.txt}}</li>
  ```
  >参数运算完毕后再去绑定
  ```
  <li :class="{'active':isActive==index}" v-for=" (item,index) in menuTab" :key="item.id">{{item.txt}}</li>
  ```
  ```
  <li :class="{'active':item.active}" v-for=" item in menuTab" :key="item.id">{{item.txt}}</li>
  ```
  >使用data参数绑定

+ 使用数据绑定
  >v-model 在表达控件或者组件上创建双向绑定的指定
  只可以使用input, select,textarea,component这几种上面

+ v-show 和v-if
  > v-show 是给dom元素添加dispaly属性
  > v-if是直接把这个dom元素删除了,dom有接口时候,回去请求接口
  > 提交检验: v-if不校验,v-model 校验,v-if 删除了一个dom

+ vue3.0 的修改
  >响应式
  >模板
  >对象式的组件声明方式
+ vue3.0的Composition API (composition表示作品,作曲,作文)


+ setup()
  ```js
  setup(props,context){
    context.attrs, //等于2.0的 this.$attr
    context.parent, //等于2.0的 this.$parent
    context.root, //等于2.0的 this
    context.slots, //等于2.0的 this.$slots
    context.emit, //等于2.0的 this.$emit
    context.refs, //等于2.0的 this.$refs
    context.listeners // 等于2.0的 this.$listeners

  },
  //或者
  setup(props,{refs}){
    refs

  },
  //模拟数据
  function  aa(){
    return {
      attrs: 0,
      redfs : 1.
      root :3
    }

  }
  let {attrs, root, refs} = aa();
  ```
+ reactiv,ref声明数据类型
+ isRef()  toRefs()

## vue环境变量
>https://cli.vuejs.org/zh/guide/mode-and-env.html
+ vue-cli有3种环境(开发,生产.测试)