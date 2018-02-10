<template>
  <main>
    <el-container>
      <el-aside width="360px">
        <el-main>
          <el-row :gutter="10">
            <el-col>
              <div class='card bg-purple-light' @click="sceneCut('common')">
                COMMON
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col>
              <div class='card bg-purple' @click="sceneCut('scene_1')">
                scene 1
                <i class="el-icon-circle-check-outline"></i>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col>
              <div class='card' @click="sceneCut('scene_2')">
                scene 2
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col>
              <div class='card' @click="sceneCut('scene_3')">
                scene 3
              </div>
            </el-col>
          </el-row>

        </el-main>
      </el-aside>

      <el-main>
        <el-row :gutter="10">
          <el-col>
            <!-- <div class="grid-content bg-purple-light"> -->
            <!-- <p class="basename"> /etc/hosts</p> -->
            <!-- </div> -->
          </el-col>
        </el-row>
        <codemirror v-model="editer_content" :options="cmOptions" @ready="onCmReady" @input="editerSave"></codemirror>

      </el-main>

    </el-container>
    <el-container>

      <el-main>
        <el-row :gutter="10">
          <el-col>
            <div class="grid-content bg-purple">
              <p class="basename">
                VIEW
                <i class="el-icon-view"></i>
              </p>
            </div>
          </el-col>
        </el-row>
        <codemirror v-model="host_content" :options="pwOptions"></codemirror>

      </el-main>
    </el-container>
  </main>

</template>


<script>
var fs = require("fs");
import path from "path";
import { remote } from "electron";
import { ENGINE_METHOD_CIPHERS } from "constants";

var createFolder = function(to) {
  //文件写入
  var sep = path.sep;
  var folders = path.dirname(to).split(sep);
  var p = "";
  while (folders.length) {
    p += folders.shift() + sep;
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
      console.log(p);
    }
  }
};

export default {
  data() {
    return {
      host_content: "const a = 10",
      editer_path: this.fullPath("common"),
      editer_content: "const a = 10",
      target_path: "/etc/hosts",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        // theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      pwOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        // theme: "base16-dark",
        // lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  methods: {
    onCmReady(cm) {
      var _this = this;
      fs.readFile(this.target_path, "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        _this.host_content = data;
      });
      console.log("the editor is readied!", cm);
    },
    editerSave() {
      // var scene_path = this.fullPath(this.editer_path);
      console.log(this.editer_path, "写入成功！", this.editer_content);
      // fs.writeFile(this.editer_path, this.editer_content, function(err) {
      //   if (!err) console.log("写入成功！");
      //   console.log(err);
      // });
    },
    targetSave() {},
    sceneCut(scene_name) {
      var scene_path = this.fullPath(scene_name);
      console.log(scene_path);
      var _this = this;
      fs.exists(scene_path, function(exists) {
        if (!exists) {
          console.log(scene_path + "不存在");
          createFolder(scene_path);
          fs.createWriteStream(scene_path);
        }

        // _this.editer_path = scene_path;
        fs.readFile(scene_path, "utf8", function(err, data) {
          if (err) {
            return console.log(err);
          }
          _this.editer_content = data;
        });
        // this.editer_content =
      });
    },
    fullPath(scene_name) {
      var scene_path = "/hosts/" + scene_name;
      return path.join(remote.app.getPath("userData"), scene_path);
    }
  }
};
</script>



<style>
.card {
  margin-bottom: 20px;
  background: #99a9bf;
  height: 50px;
  border-radius: 4px;
  line-height: 50px;
  text-align: center;
}
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
</style>