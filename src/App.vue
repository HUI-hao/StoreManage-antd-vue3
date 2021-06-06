<template>
  <div id="app">
    <div v-if="!(this.$store.state.sessionId)">
      <Login></Login>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>


import Login from "@/login/Login.vue"

export default {
  components: {
    Login,
  },
  data() {
    return {
      isRouterAlive: true  // 控制 router-view 是否显示达到刷新效果
    }
  },
  created() {
    if (this.$store.state.sessionId != undefined) {
      this.$router.push({name: "ManagerMain"})
    }
  },
  methods: {
    reload() {
      // 通过 this.isRouterAlive 控制 router-view 达到刷新效果
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  provide() {  // 在祖先组件中通过 provide 提供变量
    return {
      reload: this.reload  //  声明一个变量
    }
  },
}
</script>

<style>
body {
  margin: 0;
}

#app {

}
</style>