<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="商品名">
      <a-input class="inputBox" v-model="form.name"/>
    </a-form-item>
    <a-form-item label="价格">
      <a-input type="number" class="inputBox" v-model="form.price"/>
    </a-form-item>
    <a-form-item label="库存">
      <a-input type="number" class="inputBox" v-model="form.volume"/>
    </a-form-item>
    <a-form-item label="是否直营">
      <div>
        <a-switch :default-checked=false @change="onDirectChange"/>
      </div>
    </a-form-item>
    <a-form-item label="是否上架">
      <div>
        <a-switch :default-checked=true @change="onHaveChange"/>
      </div>
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
    let retudata = JSON.parse(this.$route.query.res)
    return {
      form: {
        id: retudata.id,
        name: retudata.name,
        price: retudata.price,
        volume: retudata.volume,
        direct: false,
        have: false,
      },
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(this.form)
      if (this.form.name != null && this.form.price != null && this.form.volume != null) {

        this.$axios.post(this.$baseurl + '/goods_c/update', this.form)
            .then(response => {//一定要lamda方式
              let obj = response.data;
              switch (obj.data) {
                case 0:
                  this.$message.info('更新成功');
                  break
                case 1:
                  this.$message.info('更新失败');
                  break
              }
            })
            .catch(error => { // 请求失败处理, 一定要lamda方式，不然无法调用到onLoginFail函数。
              this.$message.info(error);
            });
      }
    },
    onDirectChange(checked) {
      this.form.direct = checked
      console.log(this.form.direct)
    },
    onHaveChange(checked) {
      this.form.have = checked
      console.log(this.form.have)
    }
  },

};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
