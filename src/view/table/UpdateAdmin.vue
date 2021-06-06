<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="用户名">
      <a-input class="inputBox" v-model="form.username" placeholder="请输入密码"></a-input>
    </a-form-item>
    <a-form-item label="新密码">
      <a-input class="inputBox" v-model="form.password" placeholder="请输入密码"></a-input>
    </a-form-item>
    <a-form-item label="再次输入密码">
      <a-input class="inputBox" v-model="form.retry" placeholder="再次输入输入密码"></a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: this.$route.query.username,
      },
      update: {},
    };
  },
  methods: {
    handleSubmit(e) {
      if(this.form.password == this.form.retry) {
        // if(this.form.username == this.$route.query.username)
        // {
        //   this.update = {
        //     id: this.$route.query.id,
        //     password: this.$md5(this.form.password),
        //   }
        // }
        // else {
          this.update = {
            id: this.$route.query.id,
            username: this.form.username,
            password: this.$md5(this.form.password),
          }
        // }
        this.$axios.post(this.$baseurl + '/admin/update', this.update)
            .then(response => {//一定要lamda方式
              let obj = response.data;
              switch (obj.data) {
                case 0:
                  this.$message.info('更新成功');
                  break
                case 1:
                  this.$message.info('用户名重复');
                  break
                default:
                  this.$message.info('更新失败');
              }
            })
            .catch(error => { // 请求失败处理, 一定要lamda方式，不然无法调用到onLoginFail函数。
              this.$message.info(error);
            });
      }
    },
  },
};
</script>
