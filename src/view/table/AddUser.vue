<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="用户名">
      <a-input class="inputBox" v-model="form.username" placeholder="请输入用户名"></a-input>
    </a-form-item>
    <a-form-item label="密码">
      <a-input type="password" class="inputBox" v-model="form.password" placeholder="请输入密码"></a-input>
    </a-form-item>
    <a-form-item label="再次输入密码">
      <a-input type="password" class="inputBox" v-model="form.retry" placeholder="再次输入密码"></a-input>
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
      form: {},
      register: {},
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.password && this.form.username) {
        if (this.form.retry == this.form.password) {
          this.register = {
            "username": this.form.username,
            "password": this.$md5(this.form.password),
          }
          this.$axios.post(this.$baseurl + '/admin/register', this.register)
              .then(response => {//一定要lamda方式
                let obj = response.data;
                switch (obj.data) {
                  case 0:
                    this.$message.info('添加成功');
                    break
                  case 1:
                    this.$message.info('添加失败，用户名重复');
                    break
                  default:
                    this.$message.info('添加失败');
                    break
                }
              })
              .catch(error => { // 请求失败处理, 一定要lamda方式，不然无法调用到onLoginFail函数。
                this.$message.info(error);
              });
        } else {
          this.$message.info('两次输入密码不一致');
          return;
        }
      } else {
        this.$message.info('输入不能为空');
      }
    },
  },
};
</script>