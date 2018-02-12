
<template>
  <main>
    <router-link to="/test">to test</router-link>

    <el-container style="height: 500px;padding:30px;">

      <el-container style="background-color: rgb(238, 241, 246)">
        <el-header style="font-size: 12px">
          <span>foo</span>
        </el-header>

        <codemirror v-model="foo" :options="fooOptions" @input="compare"></codemirror>

      </el-container>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>bar</span>
        </el-header>

        <codemirror v-model="bar" :options="barOptions" @input="compare"></codemirror>
      </el-container>
    </el-container>
    <el-container>
      <el-header class="tool-bar angled-135">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"> 查看方式</i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>左右并排</el-dropdown-item>
            <el-dropdown-item>上下对比</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>angled-135
      </el-header>

      <el-main>

        <el-header style="font-size: 12px;width:100%;">
        </el-header>
        <!-- <el-main> -->
        <table id="diff-table">
          <tr :class="v.class+'_style'" v-for="(v, k) in diffData">
            <td class="diff-index">{{v.fooIdx}}</td>
            <td class="diff-index">{{v.barIdx}}</td>
            <td class="diff-value">{{v.value}}</td>
            <!-- <td>{{v.index}}</td> -->
          </tr>
        </table>

      </el-main>
    </el-container>
  </main>
</template>

<style>
#diff-table {
  width: 100%;
  border-spacing: 0px;
  clear: both;
  font-family: 'Segoe WPC', 'Segoe UI', 'HelveticaNeue-Light', 'Ubuntu',
    'Droid Sans', 'sans-serif';
  font-size: 14px;
}
#diff-table .diff-index {
  background: #eeeedf;
  border: 1px solid #bbbbcb;
  border-right: 0px;
  border-top: 0px;
  width: 40px;
  text-align: center;
  color: #928769;
}
#diff-table .diff-value {
  border-left: 1px solid #bbbbcb;
  border-right: 1px solid #bbbbcb;
}
#diff-table tr:last-of-type td {
  border-bottom: 1px solid #bbbbcb;
}

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
  padding: 0px;
}
.CodeMirror {
  height: 440px;
}
.active {
  background: #000;
}
.bar_style {
  background: #abeba1;
}
.foo_style {
  background: #e39d9b;
}
.tool-bar {
  text-align: right;
  font-size: 12px;
  background-size: 5px 5px;
  /* box-shadow: 1px 1px 8px gray; */

  /* border-bottom: 1px solid #ddd; */
}
/* .stripes {
  height: 25px;
  width: 37px;
  float: left;
  margin: 10px;
  background-size: 5px 5px; 
  box-shadow: 1px 1px 8px gray;
} */

.angled-135 {
  background-color: #ddd;
  background-image: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    color-stop(0.25, rgba(255, 255, 255, 1)),
    color-stop(0.25, transparent),
    color-stop(0.5, transparent),
    color-stop(0.5, rgba(255, 255, 255, 1)),
    color-stop(0.75, rgba(255, 255, 255, 1)),
    color-stop(0.75, transparent),
    to(transparent)
  );
}
</style>

<script>
var diffCompare = require('../components/DiffCompare')

export default {
  data() {
    const item = {
      name: '王小虎'
    }
    return {
      foo: '',
      bar: '',
      compareResult: '',
      diffData: Array(3).fill(item),
      fooOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        // theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      barOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        // theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {
    compare() {
      console.log("comparing 'foo' and 'bar'")

      var f1 = this.foo.toString().split('\n')
      var f2 = this.bar.toString().split('\n')
      var _this = this
      diffCompare.compare(f1, f2, function(result) {
        _this.compareResult = result
        _this.diffData = result
      })
    },
    tableCellStyle(row, index) {
      console.log(row.row.class)
      return row.row.class + '_style'
    }
  }
}
</script>
