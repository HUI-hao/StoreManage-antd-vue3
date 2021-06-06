<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="正在修改的用户：">
      <a-input class="inputBox" v-model="form.password" placeholder="请输入密码"></a-input>
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

      },
      update: {},
    };
  },
  methods: {
    handleSubmit(e) {
      if(this.form.password == this.form.retry) {
        this.update = {
          id: this.$route.query.id,
          password: this.$md5(this.form.password),
        }
        this.$axios.post(this.$baseurl + '/user/update', this.update)
            .then(response => {//一定要lamda方式
              let obj = response.data;
              switch (obj.data) {
                case 0:
                  this.$message.info('更新成功');
                  break
                default:
                  this.$message.info('更新失败');
                  break
              }
            })
            .catch(error => { // 请求失败处理, 一定要lamda方式，不然无法调用到onLoginFail函数。
              console.log(error);
              this.$message.info(error);
            });
      }
      else {
        this.$message.info('两次输入不一致');
      }
    },
  },
};
</script>
