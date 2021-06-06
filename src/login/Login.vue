<template>
  <div class="login-container">
    <p></p>
    <img src="../assets/icon.png" height="120" width="360"/>
    <p></p>
    <a-form ref="form" :model="form" class="login-form">
      <h2 class="title">用户登录 LOGIN</h2>
      <a-form-item>
        <a-input class="inputBox" v-model="form.username" placeholder="请输入用户名">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input type="password" class="inputBox" v-model="form.password" placeholder="请输入用户名"/>
      </a-form-item>
      <a-form-item>
        <a-button class="submit" type="primary" @click="onSubmit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {},
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        login: {},
      },
    }
  },

  methods: {
    onSubmit() {
      if (this.form.username && this.form.password) {
        this.login = {
          "username": this.form.username,
          "password": this.$md5(this.form.password),
        }
        console.log(this.login)
        this.$axios.post(this.$baseurl + '/admin/login', this.login)
            .then(response => {//一定要lamda方式
              let obj = response.data;
              if (obj.data == 1)//返回对象data为1, 说明用户名或密码不匹配
              {
                this.$message.info("用户名或密码错误");
                return;
              } else {
                this.$store.commit("setUsername", obj.data.username)
                this.$store.commit("setSessionId", obj.data.sessionId)
                this.$store.commit("setLoginTime", obj.data.loginTime)
                this.$message.info('登陆成功');
                this.$router.push({name: 'ManagerMain'})
              }
            })
            .catch(error => { // 请求失败处理, 一定要lamda方式，不然无法调用到onLoginFail函数。
              alert(error);
            });
      } else {
        this.$message.info('用户名或密码不能为空');
        return
      }
    },
  },
}
</script>
<style>
.login-form {
  width: 420px;
  height: 450px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 40px 110px;
  box-shadow: 0px 0px 15px #909090;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
}

/* Log */
.login-title {
  color: #000;
  text-align: center;
  margin: 60px 0;
  font-size: 48px;
  font-family: Microsoft Yahei;
}

/* 登陆按钮 */
.submit {
  width: 100%;
  height: 45px;
  font-size: 16px;
}

/* 用户登陆标题 */
.title {
  margin-bottom: 50px;
  color: #000;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}

/* 输入框 */
.inputBox {
  height: 45px;
}

/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
</style>