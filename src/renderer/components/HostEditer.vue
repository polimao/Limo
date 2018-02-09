
<template>
<main><router-link to='/'><el-button type='default'> 回到主页</el-button> </router-link>

  <codemirror v-model="host" :options="cmOptions" @ready="onCmReady"></codemirror>
</main>

</template>


<script>
// 拖拽打开文件
document.addEventListener("drop", function(e) {
  e.preventDefault();
  e.stopPropagation();

  for (let f of e.dataTransfer.files) {
    console.log("File(s) you dragged here: ", f.path);
  }
});
document.addEventListener("dragover", function(e) {
  e.preventDefault();
  e.stopPropagation();
});

// 本地文件写入
// var path = require('path')
// var _path = path.join(__dirname, '..', '\\app\\html\\config\\record.txt')
// console.log(_path)
var _path = "/etc/hosts";
// console.log(_path, path1);//测试路径对不对的
var fs = require("fs");
fs.readFile(_path, "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

// fs.writeFile(_path, 'electron + Javascript', function (err) {
//   if (!err) {
//     console.log('写入成功！')
//   }
// })
export default {
  data() {
    return {
      host: "const a = 10",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  methods: {
    onCmReady(cm) {
      var _path = "/etc/hosts";
      // console.log(_path, path1);//测试路径对不对的
      var fs = require("fs");
      var _this = this;
      fs.readFile(_path, "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        _this.host = data;
        console.log(data);
      });
      console.log("the editor is readied!", cm);
    }
  }
};
</script>
