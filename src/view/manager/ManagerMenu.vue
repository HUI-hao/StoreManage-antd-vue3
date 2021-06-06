<template>

  <a-menu
      :default-selected-keys="['3']"
      :open-keys.sync="openKeys"
      mode="inline"
      theme="dark"
      @click="handleClick"
  >
    <a-sub-menu key="sub1" @titleClick="titleClick">
      <span slot="title"><a-icon type="appstore"/><span>商品管理</span></span>
      <a-menu-item key="1">商品列表</a-menu-item>
      <a-menu-item key="2">添加商品</a-menu-item>

    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"><a-icon type="setting"/><span>用户管理</span></span>
      <a-menu-item key="8">用户列表</a-menu-item>
      <a-menu-item key="9">管理员列表</a-menu-item>
      <a-menu-item key="15">添加管理员</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <span slot="title"><a-icon type="setting"/><span>其他</span></span>
      <a-menu-item key="20">客户端展示&swagger文档</a-menu-item>
      <a-menu-item key="21">GitHub地址</a-menu-item>
      <a-menu-item key="0">退出登录</a-menu-item>
    </a-sub-menu>
  </a-menu>

</template>
<script>
export default {
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1', 'sub2', 'sub3'],
      collapsed: false,
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    titleClick(e) {
      console.log('titleClick', e);
    },
    handleClick(e) {
      console.log('click', e);
      console.log(e.key);
      switch (e.key) {
        case "0":
          this.logout()
          break
        case "1":
          this.setPage('GoodsManage')
          break
        case "2":
          this.setPage('AddGoods')
          break
        case "8":
          this.setPage('UserManage')
          break
        case "9":
          this.setPage('AdminManage')
          break
        case "15":
          this.setPage('AddUser')
          break
        case "20":
          this.setPage('Swagger')
          break
        case "21":
          this.setPage('Outside')
          break
      }
    }
  },
};
</script>
<style>
</style>