<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: '100', y:'100' }" bordered>
    <a slot="edit" slot-scope="text, record" href="javascript:;" @click="onEdit(record)">编辑</a>
    <a slot="delete" slot-scope="text, record" href="javascript:;" @click="onDelete(record)">删除</a>
    <img style="width:80px; heigth:80px" slot="pic" slot-scope="text, record" :src=record.img>>
  </a-table>
</template>
<script>

const columns = [
  {title: '商品id', width: 100, dataIndex: 'id', key: 'id'},
  {title: '商品名称', width: 500, dataIndex: 'name', key: 'name', ellipsis: true},
  {title: '图片', dataIndex: 'img', key: 'img', scopedSlots: {customRender: 'pic'}},
  {title: '价格', dataIndex: 'price', key: 'price'},
  {title: '库存', dataIndex: 'volume', key: 'volume'},
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
    };
  },
  created() {
    this.$axios.get(this.$baseurl + '/home/goods')
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response);
          this.data = response.data.data.list;
        })
        //获取失败
        .catch(error => {
          this.$message.info(error);
        })
  },
  methods:
      {
        onEdit(value) {
          let pushed = JSON.stringify(value)
          this.$router.push({path: 'UpdateGoods', query: {res: pushed}})
        },
        onDelete(value) {
          this.deleteId = {
            id: JSON.parse(JSON.stringify(value.id))
          }
          this.$axios.post(this.$baseurl + "/goods_c/delete", this.deleteId)
              .then(response => {//一定要lamda方式
                let obj = response.data;
                switch (obj.data) {
                  case 0:
                    this.$message.info('删除成功');
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
      }
}
;
data.push({});
</script>
