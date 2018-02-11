
<template>
  <main>
    <el-container style="height: 500px; border: 1px solid #eee">

      <el-container style="background-color: rgb(238, 241, 246)">
        <el-header style="font-size: 12px">
          <span>foo</span>
        </el-header>

        <!-- <el-main> -->
        <!-- <router-link to='/'>
          <el-button type='default'> 回到主页</el-button>
        </router-link> -->
        <codemirror v-model="foo" :options="fooOptions" @input="compare"></codemirror>

        <!-- </el-main> -->

      </el-container>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>bar</span>
        </el-header>

        <!-- <el-main> -->
        <codemirror v-model="bar" :options="barOptions" @input="compare"></codemirror>

        <!-- </el-main> -->
      </el-container>
    </el-container>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <!-- <codemirror v-model="foo" :options="fooOptions" @input="compare"></codemirror> -->
        <el-table :data="tableData">
          <el-table-column prop="date" label="行号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
        </el-table>

        <pre>{{ compareResult }}</pre>
      </el-main>
    </el-container>
  </main>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 30px;
  height: 30px !important;
}

.el-aside {
  color: #333;
}
* {
  margin: 0px;
}
.CodeMirror {
  height: 470px;
}
</style>

<script>
var diffCompare = require("./DiffCompare");

export default {
  data() {
    const item = {
      name: "王小虎"
    };
    return {
      foo: "",
      bar: "",
      compareResult: "",
      tableData: Array(3).fill(item),
      fooOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        // theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      barOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        // theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  methods: {
    compare() {
      console.log("comparing 'foo' and 'bar'");

      var f1 = this.foo.toString().split("\n");
      var f2 = this.bar.toString().split("\n");
      var _this = this;
      diffCompare.compare(f1, f2, function(result) {
        _this.compareResult = result;
      });
    }
  }
};
</script>
