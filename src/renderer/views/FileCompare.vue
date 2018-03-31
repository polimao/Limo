<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-container style="background-color: rgb(238, 241, 246)">
          <el-header class='foo_head'>
            <!-- <span>foo</span> -->
          </el-header>

          <codemirror v-model="foo" :options="fooOptions" @input="compare"></codemirror>

        </el-container>
      </el-col>
      <el-col :span="12">
        <el-container>
          <el-header class='bar_head'>
            <!-- <span>bar</span> -->
          </el-header>

          <codemirror v-model="bar" :options="barOptions" @input="compare"></codemirror>
        </el-container>
      </el-col>
    </el-row>
    <el-row>
      <el-header class="tool-bar angled-135">
        <i class="el-icon-caret-right" @click="triggerViewStyle('abreast')">左右并排</i>
        <i class="el-icon-caret-bottom" @click="triggerViewStyle('sidebyside')">上下对比</i>
        <router-link to="/home">
          <i class="el-icon-menu"> Home</i>
        </router-link>

      </el-header>

      <el-header style="font-size: 12px;">
      </el-header>

      <table id="diff-table" :class="{ hide: viewStyle == 'abreast'}">
        <tr :class="v.class+'_style'" v-for="(v, k) in diffData">
          <td class="diff-index">{{v.fooIdx}}</td>
          <td class="diff-index">{{v.barIdx}}</td>
          <td class="diff-value">{{v.value}}</td>
        </tr>
      </table>

      <table id="diff-table-abreast" :class="{ hide: viewStyle == 'sidebyside'}">
        <tr :class="v.class+'_style'" v-for="(v, k) in diffData">

          <td class="diff-index">{{v.fooIdx}}</td>
          <td class="diff-value" :class="v.class != 'foo' && v.class != 'peace'?'zero_style':''">
            {{ v.class == 'foo' || v.class == 'peace'? v.value : ''}}
          </td>

          <td class="diff-index">{{v.barIdx}}</td>
          <td class="diff-value" :class="v.class != 'bar' && v.class != 'peace'?'zero_style':''">
            {{v.class == 'bar' || v.class == 'peace'?v.value:''}}
          </td>
        </tr>
      </table>
    </el-row>
  </div>
</template>

<style>
  .hide {
    display: none;
  }
  .bar_head {
    text-align: right;
    font-size: 12px;
    background-color: #58e242 !important;
  }
  .foo_head {
    font-size: 12px;
    background-color: #e39d9b !important;
  }
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

  #diff-table-abreast {
    width: 100%;
    border-spacing: 0px;
    clear: both;
    font-family: 'Segoe WPC', 'Segoe UI', 'HelveticaNeue-Light', 'Ubuntu',
      'Droid Sans', 'sans-serif';
    font-size: 14px;
  }

  #diff-table-abreast .diff-index {
    background: #eeeedf;
    border: 1px solid #bbbbcb;
    border-right: 0px;
    border-top: 0px;
    width: 40px;
    text-align: center;
    color: #928769;
  }
  #diff-table-abreast .diff-value {
    border-left: 1px solid #bbbbcb;
    border-right: 1px solid #bbbbcb;
    width: 45%;
  }
  #diff-table-abreast tr:last-of-type td {
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
    height: 300px;
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
  .zero_style {
    text-align: right;
    font-size: 12px;
    background-size: 5px 5px;
    background-color: #ddd !important;
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
    ) !important;
  }
  .tool-bar {
    text-align: right;
    font-size: 12px;
    background-size: 5px 5px;
    /* box-shadow: 1px 1px 8px gray; */

    /* border-bottom: 1px solid #ddd; */
  }

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
        viewStyle: 'abreast',
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
        // console.log(row.row.class)
        return row.row.class + '_style'
      },
      triggerViewStyle(viewStyle) {
        console.log(viewStyle)
        this.viewStyle = viewStyle
      }
    }
  }
</script>
