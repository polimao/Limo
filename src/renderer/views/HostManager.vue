<template>

  <body>
    <el-container>
      <el-aside width="260px" style="background-color: rgb(238, 241, 246)" :style="{ 'border-right' :' 1px solid'+ currentScene.color,'box-shadow' :'2px 0px 5px '+ currentScene.color}">
        <div class="demo-color-box" :style="{ background : v.color }" v-for="v in scenes" @click="currentScene = v">
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
          <el-color-picker v-model="currentScene.color"></el-color-picker>
        </h3>
        <hr/>

        <h3>规则：</h3>
        <hr/>
        <el-table :data="hostData" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
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
        <textarea disabled class="preview">
          <br>数据:{{hostData}}
          <br>数据:{{hostData}}
          <br>数据:{{scenes}}</textarea>
      </el-main>
    </el-container>
  </body>
</template>


<script>
  // import path from 'path'
  import fs from 'fs'
  export default {
    data() {
      return {
        currentScene: {
          name: '通用',
          color: 'red',
          roleName: 'common'
        },
        scenes: [
          {
            name: '通用',
            color: '#5484B4',
            roleName: 'common'
          },
          {
            name: '情景一',
            color: '#D8463F',
            roleName: 'scene1'
          },
          {
            name: '情景二',
            color: '#5DA150',
            roleName: 'scene2'
          },
          {
            name: '情景三',
            color: '#F6D449',
            roleName: 'scene3'
          }
        ],
        hostData: [
          {
            ip: '172.0.0.1',
            domain: 'www.baidu.com'
            // note: '05月30日'
          },
          {
            ip: '172.0.0.1',
            domain: 'www.baidu.com'
            // note: '05月30日'
          },
          {
            ip: '172.0.0.1',
            domain: 'www.baidu.com',
            note: '05月30日'
          },
          {
            ip: '172.0.0.1',
            domain: 'www.baidu.com',
            note: '05月30日'
          },
          {
            ip: '172.0.0.1',
            domain: 'www.baidu.com',
            note: '05月30日'
          }
        ],
        editerPath: '/etc/hosts'
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
        fs.writeFile(this.editerPath, this.hostData.toString(), function(err) {
          if (!err) console.log('写入成功！')
        })
      }
    },
    mounted() {
      this.currentScene = this.scenes[0]

      this.$db.remove({}, { multi: true }, function(err, numRemoved) {})

      this.$db.insert({
        table: 'hostData',
        common: this.hostData,
        scene1: this.hostData,
        scene2: this.hostData,
        scene3: this.hostData
      })

      this.$db.findOne({ table: 'hostData' }, function(err, docs) {
        console.log('hostData', docs)
      })

      // Find all documents in the collection
      this.$db.find({}, function(err, docs) {
        console.log(docs)
      })

      this.$db.update({ table: 'hostData' }, { common: 567 }, {}, function(
        err,
        numReplaced
      ) {
        console.log(numReplaced)
        // Now the fruits array is ['apple', 'orange']
        // With { $pop: { fruits: -1 } }, it would have been ['orange', 'pear']
      })

      this.$db.findOne({ table: 'hostData' }, function(err, docs) {
        console.log('hostData', docs)
      })
    }
  }
</script>



<style>
  * {
    margin: 0;
    padding: 0;
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
    margin: 5px 0;
    height: 54px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    position: relative;
  }
  .arrow {
    /* width: 13px; */
    /* height: 54px; */
    position: absolute;
    top: 0px;
    right: -14px;
    z-index: 91999;
    border-top: 27px solid transparent;
    border-right: 13px solid #fff;
    border-bottom: 27px solid transparent;
  }
  .bg-success {
    background: #67c23a;
  }
  .preview {
    display: block;
    width: 100%;
    height: 500px;
    font-size: 15px;
    background: #eee;
    border-radius: 5px;
  }
</style>