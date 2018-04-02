<template>

  <body>
    <el-container>
      <el-aside width="260px" style="background-color: rgb(238, 241, 246)" :style="{ 'border-right' :' 1px solid'+ currentScene.color,'box-shadow' :'2px 0px 5px '+ currentScene.color}">

        <div class="demo-color-box">
          <router-link to="/home">home</router-link>
        </div>
        <div class="demo-color-box" :style="{ background : v.color }" :class="{'current' : v.name == currentScene.name}" v-for="v in scenes" @click="currentScene = v">
          {{ v.name}}
          <div class="arrow" :style="{ background : v.color }" v-if="v.name == currentScene.name"></div>
        </div>
      </el-aside>
      <el-main>
        <h3>
          情景名称：{{currentScene.name}}</h3>
        <hr/>
        <h3>
          配色：
          <el-color-picker v-model="currentScene.color" size="mini" :predefine="predefineColors">
          </el-color-picker>
        </h3>
        <hr/>

        <h3>规则：</h3>

        <el-table :data="currentScene.hostData" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
          <el-table-column label="IP" width="180">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.ip" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.ip}}</span>
            </template>
          </el-table-column>
          <el-table-column label="域名" width="180">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.domain" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.domain}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="备注">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.note" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.note}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class='el-icon-delete'></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <textarea disabled class="preview">{{ preData }}
        </textarea>

      </el-main>
    </el-container>
  </body>
</template>


<script>
  // import path from 'path'
  // import fs from 'fs'
  export default {
    data() {
      return {
        currentScene: {
          name: '通用',
          color: 'red',
          roleName: 'common',
          hostData: [
            // {
            //   ip: '172.0.0.1',
            //   domain: 'www.baidu.com'
            //   // note: '05月30日'
            // },
          ]
        },
        scenes: [
          {
            name: '通用',
            color: '#5484B4',
            roleName: 'common',
            hostData: [
              // {
              //   ip: '172.0.0.1',
              //   domain: 'www.baidu.com'
              //   // note: '05月30日'
              // }
            ]
          },
          {
            name: '情景一',
            color: '#D8463F',
            roleName: 'scene1',
            hostData: []
          },
          {
            name: '情景二',
            color: '#5DA150',
            roleName: 'scene2',
            hostData: []
          },
          {
            name: '情景三',
            color: '#F6D449',
            roleName: 'scene3',
            hostData: []
          }
        ],
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585'
        ],
        editerPath: '/etc/hosts',
        preData: ''
      }
    },
    methods: {
      handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
      },
      handleEdit(index, row) {
        this.saveHost()
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      saveHost() {
        var _this = this
        this.$db.update(
          { table: 'hostData' },
          {
            table: 'hostData',
            scenes: this.scenes
          },
          {},
          function(err, numReplaced) {
            console.log(numReplaced)
            if (numReplaced != 1) {
              _this.$db.insert({
                table: 'hostData',
                scenes: _this.scenes
              })
            }
          }
        )

        this.$db.findOne({ table: 'hostData' }, function(err, docs) {
          console.log(' updated hostData', docs)
          if (docs) {
            _this.scenes = docs.scenes
            _this.currentScene = _this.scenes[0]
          }
        })

        // fs.writeFile(this.editerPath, this.hostData.toString(), function(err) {
        //   if (!err) console.log('写入成功！')
        // })

        // 查询所有数据
        this.$db.find({}, function(err, docs) {
          console.log(docs)
        })
      }
    },
    mounted() {
      // 删除所有数据
      // this.$db.remove({}, { multi: true }, function(err, numRemoved) {})

      var _this = this
      // 查询数据
      this.$db.findOne({ table: 'hostData' }, function(err, docs) {
        console.log(' get hostData', docs)
        if (docs) {
          _this.scenes = docs.scenes
          _this.currentScene = _this.scenes[0]
        }
      })

      // // 查询所有数据
      // this.$db.find({}, function(err, docs) {
      //   console.log(docs)
      // })
    },
    watch: {
      currentScene: function(val) {
        var preData = []
        val.hostData.forEach(row => {
          row = row.ip + ' ' + row.domain + '     // ' + row.note
          preData.push(row)
        })
        this.preData = preData.join('\n')
      }
    }
  }
</script>



<style>
  * {
    margin: 0;
    padding: 0;
  }
  main {
    display: inline !important;
  }
  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, SimSun, sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .tb-edit .el-input {
    display: none;
  }
  .tb-edit .current-row .el-input {
    display: block;
  }
  .tb-edit .current-row .el-input + span {
    display: none;
  }
  .el-aside {
    overflow: inherit;
  }
  .demo-color-box {
    /* border-radius: 4px; */
    padding: 20px;
    margin: 8px 0;
    height: 36px;
    box-sizing: border-box;
    color: #fff;
    line-height: 0px;
    font-size: 16px;
    position: relative;
    cursor: pointer;
  }
  .arrow {
    /* width: 13px; */
    /* height: 54px; */
    position: absolute;
    top: 0px;
    right: -14px;
    z-index: 91999;
    border-top: 19px solid transparent;
    border-right: 13px solid #fff;
    border-bottom: 19px solid transparent;
    /* box-shadow: 2px 0 5px #ddd; */
  }
  .bg-success {
    background: #67c23a;
  }
  .preview {
    padding: 10px;
    margin: 10px auto;
    display: block;
    width: 95%;
    height: 500px;
    font-size: 15px;
    background: #eee;
    border-radius: 5px;
    cursor: auto;
  }
  .current {
    line-height: 2px;
    border-top: #333 solid 1px;
    border-bottom: #333 solid 1px;
  }
</style>