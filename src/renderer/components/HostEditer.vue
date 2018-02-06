
<template>
<main><router-link to='/'><el-button type='default'> 回到主页</el-button> </router-link>

<textarea id='code' value="sadfa">123</textarea>
<!-- <div id='holder'>
  Drag your file here
</div> -->
</main>

</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  // import CodeMirror from 'codemirror/lib/codemirror'
  // CodeMirror.fromTextArea(document.getElementById('code'), {
  //   lineNumbers: true
  // })

  // 拖拽打开文件
  document.addEventListener('drop', function (e) {
    e.preventDefault()
    e.stopPropagation()

    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  })
  document.addEventListener('dragover', function (e) {
    e.preventDefault()
    e.stopPropagation()
  })

  // 本地文件写入
  // var path = require('path')
  // var _path = path.join(__dirname, '..', '\\app\\html\\config\\record.txt')
// console.log(_path)
  var _path = '/etc/hosts'
  // console.log(_path, path1);//测试路径对不对的
  var fs = require('fs')
  fs.readFile(_path, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  })

  // fs.writeFile(_path, 'electron + Javascript', function (err) {
  //   if (!err) {
  //     console.log('写入成功！')
  //   }
  // })
</script>
