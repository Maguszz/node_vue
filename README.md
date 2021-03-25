# VUE 3.0准备
[TOC]
> vue+route+vuex+axuios+ElememtUI 管理后台系统
> 来自 `手把手撸前端`

## node安装和配置
>https://www.cnblogs.com/zhouyu2017/p/6485265.html

## 镜像
```bash
npm install cnpm -g --registry=https://registry.npm.taobao.org
```
## 脚本策略(用管理员打开vscode 执行)
> powershell 里面执行无效 
```bash
PS C:\Windows\system32> get-ExecutionPolicy
AllSigned
PS C:\Windows\system32> Set-ExecutionPolicy RemoteSigned -Scope Process

执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): A
PS C:\Windows\system32> get-ExecutionPolicy
RemoteSigned
PS C:\Windows\system32> get-ExecutionPolicy
RemoteSigned
PS C:\Windows\system32>
```

## vue
```bash
//安装
cnpm install -g @vue/cli
//卸载
npm uninstall   @vue/cli  -g
//安装低版本
cnpm install -g @vue/cli@3.11.0
```

## git
+ 一级
 克隆 : git clone ...
 创建开发分支 : git branch  dev
 切换开发分支 : git checkout  dev
 创建并且切换分支 : git checkout -b  dev
+ 二级
 创建开发分支下的功能分支 : git branch  feature-vue-V1.0.0-20201021
 >切换到此分支,进行功能开发,feature-项目名字-版本号-开发日期
  
```bash
 git branch -a
 git push --set-upstream origin feature-vue-V1.0.0-20201021
```

## vue-cli 
```bash
 vue create node-vue  //创建vue 
  //有相同目录,然后选择合并目录,没有自动创建新的\
  
```
+  自定义初始化模块
+  选择vue3或者2
+  选择hash开发模式,不要history开发模式
+  选择其他配置
```bash
Vue CLI v4.5.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Vuex, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 3.x (Preview)
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No

```
## 启动项目
```bash
 $ cd node-vue
 $ npm run serve
```
# Vue2.0和3.0区别
+ 去除了static config build
+ 增加了public
+ 自动依赖node_moudules
+ 默认配置webpack(在vue.config中)
+ vue inspect(检查的意思)查看配置
+ 内置了vue-cli-service serve服务
+ 打开图形界面 vue ui查看

# 开发
## 基本配置
+ 创建根目录下 vue.config.js文件
+ 配置vue.config.js文件()
## 路由
+ node-vue\src\router\index.js

## Element
> 使用npm安装,cnpm可能会出错
```bash
cnpm i element-ui -S
```
### 在main.js 注入
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```
## vue composition-api依赖
```bash
cnpm install @vue/composition-api --save
```
### 引入
```js
import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import  axios from  "axios"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
```
## vue声明周期2.0和3.0映射
2.0                   3.0
beforeCreate         setup
created              setup
beforeMount          onBeforeMount
methods              去除,普通方式写方法
beforeUpdate         onBeforeUpdate
updated              onUpdated
beforeDestroy        onBeforeUnmount
destoryed            onUnmounted
errorCaptured        onErrorCaptured

### 3.0新增
onRenderTracked 
onRenderTriggered
两个钩子函数类似于 onTrack和onTrigge

## 必须删除 this 和data()


# 使用axios
>http://www.axios-js.com/zh-cn/docs/#axios-url-config


## import使用{}和不使用{}的区别
> 看有没有使用export default 这2个结合的关键字

## axios 跨域请求
>https://www.cnblogs.com/ysx215/p/11446531.html
  在vue.config.js中进行配置