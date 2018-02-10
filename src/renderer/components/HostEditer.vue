<template>
  <main>
    <el-container>
      <el-aside width="250px">
        <el-main>
          <el-row :gutter="10">
            <el-col>
              <div class='card'>
                这是一个 Host 配置
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col>
              <div class='card'>
                这是一个 Host 配置
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col>
              <div class='card'>
                这是一个 Host 配置
              </div>
            </el-col>
          </el-row>

        </el-main>
      </el-aside>

      <el-main>
        <el-row :gutter="10">
          <el-col>
            <div class="grid-content bg-purple-light">
              <p class="basename"> /etc/hosts</p>
              <span class="push-button">i.</span>
            </div>
          </el-col>
        </el-row>
        <codemirror v-model="host" :options="cmOptions" @ready="onCmReady"></codemirror>
        <el-button @click="save">保存</el-button>
        <router-link to='/'>
          <el-button type='default'> 回到主页</el-button>
        </router-link>
      </el-main>
    </el-container>

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
      var _path = "/etc/shells";
      // console.log(_path, path1);//测试路径对不对的
      var fs = require("fs");
      var _this = this;
      fs.readFile(_path, "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        _this.host = data;
        // console.log(data);
      });
      console.log("the editor is readied!", cm);

      const os = require("os");
      const userInfo = os.userInfo();
      console.log(userInfo);
    },
    save() {
      var _path = "/etc/shells";
      var fs = require("fs");
      // var fs = require("@mh-cbon/sudo-fs");
      console.log(process);
      // fs.chmod(_path, "0777", function(err) {
      //   if (!err) console.log("权限操作成功！");
      //   console.log(err);
      // });

      // fs.createReadStream(_path);
      // fs.createWriteStream(_path).end("some data");
      fs.writeFile(_path, this.host, function(err) {
        if (!err) console.log("写入成功！");
        console.log(err);
      });
      // alert(this.host);
    }
  }
};
</script>



<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.basename {
  line-height: 35px;
  padding-left: 10px;
  margin: 0px;
}
.card {
  margin-bottom: 20px;
  background: #99a9bf;
  height: 100px;
}
</style>