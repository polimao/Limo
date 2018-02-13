<template>
  <main>
    <el-container>
      <el-aside width="360px" style="background-color: rgb(238, 241, 246)">
        <el-main>

          <el-radio-group v-model="active">

            <el-row :gutter="10">
              <el-col>
                <div class='card bg-purple-light' @click="sceneCut('common')">
                  <el-radio label="全局"></el-radio>

                </div>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col>
                <div class='card bg-purple' @click="sceneCut('scene_1')">

                  <el-radio label="情景一"></el-radio>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col>
                <div class='card' @click="sceneCut('scene_2')">
                  <el-radio label="情景二"></el-radio>

                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col>
                <div class='card' @click="sceneCut('scene_3')">
                  <el-radio label="情景三"></el-radio>

                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col>
                <div class='card'>
                  <router-link to="/test">
                    <el-radio label="home"></el-radio>

                  </router-link>

                </div>
              </el-col>
            </el-row>
          </el-radio-group>

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
        <codemirror v-model="target_content" :options="pwOptions"></codemirror>

      </el-main>
    </el-container>
  </main>

</template>


<script>
  import path from 'path'
  import { remote } from 'electron'
  import { ENGINE_METHOD_CIPHERS } from 'constants'

  var createFolder = function(to) {
    // 文件写入
    var sep = path.sep
    var folders = path.dirname(to).split(sep)
    var p = ''
    while (folders.length) {
      p += folders.shift() + sep
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
        console.log(p)
      }
    }
  }

  export default {
    data() {
      return {
        active: true,
        scene_name: 'common',
        target_content: '',
        common_content: '',
        editer_path: this.fullPath('common'),
        editer_content: '',
        target_path: '/etc/hosts',
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/javascript',
          // theme: "base16-dark",
          lineNumbers: true,
          line: true
          // more codemirror options, 更多 codemirror 的高级配置...
        },
        pwOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/javascript',
          // theme: "base16-dark",
          // lineNumbers: true,
          line: true
          // more codemirror options, 更多 codemirror 的高级配置...
        }
      }
    },
    methods: {
      onCmReady(cm) {
        var _this = this
        fs.readFile(this.target_path, 'utf8', function(err, data) {
          if (err) {
            return console.log(err)
          }
          _this.target_content = data
        })
        this.sceneCut('common')
        console.log('the editor is readied!', cm)
      },
      editerSave() {
        console.log(this.editer_path, '开始成功！')

        fs.writeFile(this.editer_path, this.editer_content, function(err) {
          if (!err) console.log('写入成功！')
        })
        // linkageView
        this.linkageView()
      },
      linkageView() {
        if (this.scene_name == 'common') {
          this.target_content = this.editer_content
        } else {
          this.target_content = this.common_content + '\n' + this.editer_content
        }
        // console.log(this.target_content);
        fs.writeFile(this.target_path, this.target_content, function(err) {})
      },
      sceneCut(scene_name) {
        this.scene_name = scene_name
        var scene_path = this.fullPath(scene_name)
        this.editer_path = scene_path

        console.log(scene_path)
        var _this = this

        fs.readFile(scene_path, 'utf8', function(err, data) {
          if (err) {
            fs.exists(scene_path, function(exists) {
              if (!exists) {
                console.log(scene_path + '不存在')
                createFolder(scene_path)
                fs.createWriteStream(scene_path)
                _this.sceneCut(scene_name)
              }
            })
            return console.log(err)
          }
          if (scene_name == 'common') _this.common_content = data
          _this.editer_content = data
        })
      },
      fullPath(scene_name) {
        var scene_path = '/hosts/' + scene_name
        return path.join(remote.app.getPath('userData'), scene_path)
      }
    }
  }
</script>



<style>
  .card {
    margin-bottom: 20px;
    background: #99a9bf;
    height: 50px;
    border-radius: 4px;
    line-height: 50px;
    text-align: center;
    box-shadow: 1px 1px 3px #99a9bf;
  }
  .card:hover {
    cursor: pointer;
  }
  .active {
    line-height: 53px;
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