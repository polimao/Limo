<template>
  <main>
  <el-table
    ref="singleTable"
    :data="data.tableData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="date"
      label="日期"
      width="120">
    </el-table-column>

              <el-table-column label="IP" width="180">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.date" placeholder="请输入内容"></el-input>
              <span>{{scope.row.date}}</span>
            </template>
          </el-table-column>


    <el-table-column
      property="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(currentScene.hostData[0])">选中第二行</el-button>
    <el-button @click="setCurrent()">取消选择</el-button>
  </div>


        <el-table ref="singleTable2" :data="currentScene.hostData" class="tb-edit" style="width: 100%" highlight-current-row>
          <el-table-column label="IP" width="180">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.ip" placeholder="请输入内容"></el-input>
              <span>{{scope.row.ip}}</span>
            </template>
          </el-table-column>
          <el-table-column label="域名" width="180">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.domain" placeholder="请输入内容"></el-input>
              <span>{{scope.row.domain}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="备注">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.note" placeholder="请输入内容"></el-input>
              <span>{{scope.row.note}}</span>
            </template>
          </el-table-column>
        </el-table>
            <router-link to='/host-manager'>
      <el-button size="mini" type="danger">host</el-button> 
    </router-link>
</main>
</template>

<script>
  export default {
    data() {
      return {
        currentScene: {
          name: '',
          color: '',
          roleName: '',
          hostData: [
            {
              ip: '172.0.0.1',
              domain: 'www.baidu.com',
              note: '05月30日'
            },
          ],
        },
        data:{
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    },

    methods: {
      setCurrent(row) {
        this.$refs.singleTable2.setCurrentRow(row);
      }
    }
  }
</script>
<style>
    .tb-edit .el-input {
    display: none;
  }
  .tb-edit .current-row .el-input {
    display: block;
  }
  .tb-edit .current-row .el-input + span {
    display: none;
  }
</style>