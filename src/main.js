
import Vue from 'vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import router from './router/index.js'
import App from './App'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5
Vue.config.productionTip = false;
import store from './store.js'
Vue.prototype.$store = store
import axios from 'axios' //导入ajax访问库 axios
Vue.prototype.$axios= axios   //增加一个this对象的$ajax变量

//设置后台服务地址的协议，主机名，端口部分， 根据自己服务器地址修改。
Vue.prototype.$baseurl="http://ligang666.top";
axios.defaults.withCredentials = true    //设置axios请求时带上sessionid
//增加vue中this对象setPage函数，通过页面名称方式来改变当前访问页面
Vue.prototype.setPage=function(pageName){
  if (this.$route.name != pageName) {
    this.$router.push({ name: pageName })
  }
  console.log("page path="+this.$route.path)
  console.log("page name="+this.$route.name)
}

//增加vue中this对象logout函数, 清除当前登录用户，回到初始页面/
Vue.prototype.logout=function(){
  this.$store.commit("clearUsername")
  this.$store.commit("clearSessionId")
  this.$store.commit("clearLoginTime")
  sessionStorage.clear();
  this.$message.info('已退出登录');
  this.$router.push({ path: "/" });
}


new Vue({
  render: h => h(App),
  router,  //vue中增加路由支持
}).$mount('#app');


