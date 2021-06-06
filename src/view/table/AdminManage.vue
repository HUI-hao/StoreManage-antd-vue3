<template>
  <a-table :columns="columns" :data-source="data">
    <a slot="edit" slot-scope="text, record" href="javascript:;" @click="onEdit(record)">编辑</a>
    <a slot="delete" slot-scope="text, record" href="javascript:;" @click="onDelete(record)">删除</a>
  </a-table>
</template>
<script>
const columns = [
  {title: 'id', width: 50, dataIndex: 'id', key: 'id'},
  {title: '用户名', width: 50, dataIndex: 'username', key: 'name'},
  {
    title: '编辑',
    key: 'edit',
    width: 100,
    scopedSlots: {customRender: 'edit'},
  },
  {
    title: '删除',
    key: 'delete',
    width: 100,
    scopedSlots: {customRender: 'delete'},
  },
];

const data = [];


export default {
  inject: ['reload'],
  data() {
    return {
      data,
      columns,
      deleteId: {}
    };
  },
  created() {
    this.$axios.post(this.$baseurl + '/admin/alladmin').then(response => {
      console.log(response);
      this.data = response.data;
    })
        //获取失败
        .catch(error => {
          this.$message.info(error);
        })
  },
  methods:
      {
        onEdit(value) {
          let pushed = JSON.parse(JSON.stringify(value.username))
          this.$router.push({path: 'UpdateAdmin', query: {id: JSON.stringify(value.id), username: pushed}})
        },
        onDelete(value) {
          this.deleteId = {
            id: JSON.parse(JSON.stringify(value.id))
          }
          this.$axios.post(this.$baseurl+"/admin/delete",this.deleteId)
              .then(response => {//一定要lamda方式
                let obj = response.data;
                switch (obj.data){
                  case 0:
                    this.$message.info('添加成功');
                    this.reload();
                    break
                  default:
                    this.$message.info('删除失败');
                    break
                }
              })
              .catch(error => { // 请求失败处理, 一定要lamda方式，不然无法调用到onLoginFail函数。
                this.$message.info(error);
              });
        },
      },

};
data.push({});
</script>
