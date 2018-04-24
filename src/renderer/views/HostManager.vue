<template>
  <main>
    <el-container>
      <el-aside>
        <br/>
        <div class="demo-color-box">情景</div>
        <div class="demo-color-box" :class="{'current' : v.name == currentScene.name}" v-for="(v,k) in scenes" @click="switchScene(v,k)">
          <el-color-picker style="float:left;" v-model="v.color" size="mini" @change="changeColor" :predefine="predefineColors">

          </el-color-picker>
          <span>&nbsp;&nbsp;{{ v.name}}</span>

          <!-- <i v-show="v.roleName === usedScene" style="float:right;color:#6F9BF1;font-size:20px;">✓</i> -->
        </div>
      </el-aside>
      <el-main>

        <!-- <h4>
          <el-input v-if="nameInputVisible" v-model="currentScene.name" @keyup.enter.native="nameInputConfirm" @blur="nameInputConfirm" size="mini"></el-input>

          <div v-else @click="nameInputVisible = true">{{currentScene.name}}</div>

        </h4> -->

        <div id="hostTable">
          <el-table ref="singleTable" :data="currentScene.hostData" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange" :row-class-name="invalidClassName">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="ip" label="IP">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.ip" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)" @keyup.enter.native="buttonEdit"></el-input>
                <span>{{scope.row.ip}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="domain" label="域名">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.domain" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)" @keyup.enter.native="buttonEdit"></el-input>
                <span>{{scope.row.domain}}</span>
              </template>
            </el-table-column>˝
            <el-table-column prop="note" label="ⓘ" width="100">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.note" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)" @keyup.enter.native="buttonEdit"></el-input>
                <span>{{scope.row.note}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right" width="90">
              <template scope="scope">
                <i class='el-icon-circle-check-outline success-icon' @click="buttonEdit(scope.$index, scope.row)"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <i class='el-icon-delete delete-icon' @click="handleDelete(scope.$index, scope.row)"></i>

              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" style="margin-top:8px;" @click="addOne">
            <i class="el-icon-plus"></i>
          </el-button>
        </div>

        <p class="preview" :class="{ 'preview-show':previewShow}">
          <span v-for="row in preview.hostData">{{ row.ip }} {{ row.domain }}
            <span class="space" v-for="(v,k) in preview.longest" v-if="preview.longest.length - k> row.longest">&nbsp;</span>
            #{{ row.note }}</br>
          </span>

        </p>
        <div id="blockControl" @click="previewShow = !previewShow">
          <i class="el-icon-caret-bottom">
            <span>&nbsp;{{ previewShow?'隐藏':'显示' }}源码</span>
          </i>

        </div>

      </el-main>
      <div id="menu-navigation">
        <menu-navigation></menu-navigation>
      </div>
    </el-container>

  </main>
</template>


<script>
  // import path from 'path'

  // import fs from 'fs'

  import MenuNavigation from './LandingPage/Menu'
  export default {
    data() {
      return {
        usedScene: '',
        currentScene: {
          name: '',
          color: '',
          roleName: '',
          hostData: [
            // {
            //   ip: '172.0.0.1',
            //   domain: 'www.baidu.com'
            //   // note: '05月30日'
            // },
          ]
        },
        scenes: {
          common: {
            name: 'Common',
            color: '#D3D3D3',
            roleName: 'common',
            hostData: [
              // {
              //   ip: '172.0.0.1',
              //   domain: 'www.baidu.com'
              //   // note: '05月30日'
              // }
            ]
          },
          dev: {
            name: 'Dev',
            color: '#EF836C',
            roleName: 'scene1',
            hostData: []
          },
          test: {
            name: 'Test',
            color: '#F7BD76',
            roleName: 'scene2',
            hostData: []
          },
          prod: {
            name: 'Production',
            color: '#F9EA8C',
            roleName: 'scene3',
            hostData: []
          }
        },
        predefineColors: [
          '#EF836C',
          '#F7BD76',
          '#F9EA8C',
          '#CAEA8C',
          '#8BCBFB',
          '#DAB0F4',
          '#D3D3D3'
        ],
        editerPath: '/etc/hosts',
        preview: {},
        previewShow: false,
        nameInputVisible: false
      }
    },
    name: 'landing-page',
    components: { MenuNavigation },
    methods: {
      changeColor(val) {
        console.log('changeColor' + val)
        this.saveHost()
      },
      handleCurrentChange(row, event, column) {
        console.log('handleCurrentChange')
        // console.log(
        //   'handleCurrentChange',
        //   row,
        //   event,
        //   column,
        //   event.currentTarget
        // )
      },
      handleEdit(index, row) {
        this.saveHost()
        console.log('handleEdit', index, row)
      },
      handleDelete(index, row) {
        console.log('delete', index, row)
        this.currentScene.hostData.splice(index, 1)
        this.saveHost()
      },
      switchScene(scene, index) {
        this.$cookies.set('switchSceneIndex', index)
        this.currentScene = scene
      },
      addOne() {
        console.log('addOne')
        this.currentScene.hostData.push({
          ip: '',
          domain: '',
          note: ''
        })
        this.setCurrent()
      },
      buttonEdit(index, row) {
        console.log('buttonEdit')
        var t1
        var that = this
        clearTimeout(t1)
        t1 = setTimeout(function() {
          that.$refs.singleTable.setCurrentRow({})
        }, 50)
      },
      saveHost() {
        console.log('saveHost')
        this.$db.update(
          { table: 'hostData' },
          {
            $set: {
              scenes: this.scenes
            }
          },
          { upsert: true },
          function(err, numReplaced) {
            console.log(err, numReplaced)
          }
        )

        // this.$db.findOne({ table: 'hostData' }, function(err, docs) {
        //   console.log(' updated hostData', err, docs)
        //   if (docs) {
        // that.scenes = docs.scenes
        // that.currentScene = that.scenes[0]
        //   }
        // })

        // fs.writeFile(this.editerPath, this.hostData.toString(), function(err) {
        //   if (!err) console.log('写入成功！')
        // })

        // 查询所有数据
        // this.$db.find({}, function(err, docs) {
        //   console.log(err, docs)
        // })
      },
      setCurrent() {
        console.log('setCurrent')
        var t
        var that = this
        clearTimeout(t)
        t = setTimeout(function() {
          let index = that.currentScene.hostData.length - 1
          let row = that.currentScene.hostData[index]
          that.$refs.singleTable.setCurrentRow(row)
        }, 300)
      },
      invalidClassName({ row, rowIndex }) {
        var invalidClass = '',
          currentClass = ''

        let doms = document.getElementsByClassName('el-table__row')
        if (
          doms[rowIndex] &&
          doms[rowIndex].className.indexOf('current-row') !== -1
        ) {
          currentClass = ' current-row'
        }

        if (row.ip === '' || row.domain === '') {
          invalidClass = 'invalid'
        }
        return invalidClass + currentClass
      },
      nameInputConfirm() {
        console.log('nameInputConfirm')
        this.nameInputVisible = false
        this.saveHost()
      }
    },
    mounted() {
      // console.log('cookies', this.$cookies)
      // 删除所有数据
      // this.$db.remove({}, { multi: true }, function(err, numRemoved) {})

      const that = this
      // 查询数据
      this.$db.findOne({ table: 'hostData' }, function(error, docs) {
        console.log(' get hostData', error, docs)
        if (docs) {
          that.scenes = docs.scenes
          that.usedScene = docs.usedScene
          let index = that.$cookies.get('switchSceneIndex')
          console.log('index', index)
          if (!index) {
            index = 0
          }

          that.currentScene = that.scenes[index]
        }
      })

      // // 查询所有数据
      // this.$db.find({}, function(err, docs) {
      //   console.log(docs)
      // })
    },
    watch: {
      currentScene: function(val) {
        console.log(' 数据有变更')
        this.preview.longest = []
        var that = this
        val.hostData.forEach(function(row) {
          let length = row.ip.length + row.domain.length + 1
          row.longest = length
          if (that.preview.longest.length < length) {
            that.preview.longest = new Array(1 + length)
          }
        })

        this.preview.hostData = val.hostData
      }
    }
  }
</script>



<style>
  *,
  body {
    margin: 0px 0px;
    padding: 0px;
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
  table th,
  table td {
    padding: 6px 0px !important;
  }
  table tr.invalid {
    background-size: 10px 10px;
    background-color: rgb(253, 239, 239);
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
  .tb-edit .current-row td {
    padding: 4px 0px !important;
  }
  .el-input--small input {
    height: 27px !important;
    line-height: 27px !important;
  }
  .el-input--small input.el-input__inner {
    padding: 0 8px;
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
    width: 150px !important;
    background-color: #f5f5f4;
    border-right: 1px solid #dddddd;
    height: 100vh;
    overflow: inherit;
  }
  .tb-edit .success-icon {
    display: none;
  }
  .tb-edit .current-row .success-icon {
    display: inline;
    cursor: pointer;
  }
  #hostTable {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ebebeb;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    transition: 0.2s;
  }
  .tb-edit .delete-icon {
    color: brown;
    padding-left: 14px;
    cursor: pointer;
  }
  .tb-edit .current-row .delete-icon {
    display: inline;
    padding-left: 0px;
    cursor: pointer;
  }
  .demo-color-box {
    height: 30px;
    box-sizing: border-box;
    color: #333333;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    padding-left: 10px;
  }

  .bg-success {
    background: #67c23a;
  }
  .preview {
    font-family: Fira Code, Tahoma, Geneva, Verdana, sans-serif;
    padding: 8px;
    /* margin: 50px auto; */
    display: none;
    /* width: 100%; */
    height: 0px;
    font-size: 15px;
    background: #fafafa;
    border-left: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    cursor: not-allowed;
  }
  p.preview span {
    padding: 0px;
    margin: 0px;
  }
  .current {
    background: #dddfe1;
  }

  #menu-navigation {
    position: fixed;
    right: 10px;
    bottom: 10px;
  }
  .hovering {
    transform: translateX(-40px);
  }
  #blockControl {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    color: #409eff;
    text-align: center;
    border: 1px solid #ebebeb;
    border-top: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  #blockControl:hover {
    color: #409eff;
    background-color: #f9fafc;
  }
  #blockControl:hover i {
    transform: translateX(-20px);
  }
  #blockControl:hover span {
    display: inline;
    /* transform: translateX(-40px); */
  }
  #blockControl i {
    color: #409eff;
    font-size: 16px;
    line-height: 40px;
    transition: 0.3s;
  }
  #blockControl span {
    display: none;
    transition: 0.3s;
  }

  .preview-show {
    height: 300px;
    transition: 0.3s;
    display: block;
  }
</style>