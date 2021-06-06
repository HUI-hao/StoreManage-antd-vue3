<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" style="text-align:left;color: #fff;">主菜单</div>
        <ManagerMenu></ManagerMenu>
    </a-layout-sider>

    <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
              <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="() => (collapsed = !collapsed)"
              />
            <span> 欢迎您:{{this.$store.state.username}}  [登录时间:{{this.$store.state.loginTime}}] </span>
        </a-layout-header>
        <a-layout-content    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '800px' }" >

            <router-view/>
        </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

  import ManagerMenu from "./ManagerMenu";
export default {
  data() {
      return {
        current: ['mail'],
        collapsed: false,
      };
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  methods: {
      titleClick(e) {
        console.log('titleClick', e);
      },
  },
  components:{
    ManagerMenu,
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}
</style>