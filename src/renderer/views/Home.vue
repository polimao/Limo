<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">

        <div>

          <el-menu default-active="1-1" class="el-menu-vertical-demo" v-model="isCollapse" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">Menu</span>
              </template>
              <el-menu-item-group>
                <span slot="title">单页面</span>
                <router-link to='/file-compare'>
                  <el-menu-item index="1-1">File Compare</el-menu-item>
                </router-link>
                <router-link to='/host-editer'>
                  <el-menu-item index="1-2">Host Editer</el-menu-item>
                </router-link>
                <router-link to='/code-mirror'>
                  <el-menu-item index="1-2">Code Mirror</el-menu-item>
                </router-link>
                <router-link to='/code-run'>
                  <el-menu-item index="1-2">Code Run</el-menu-item>
                </router-link>
                <router-link to='/help'>
                  <el-menu-item index="1-2">Help</el-menu-item>
                </router-link>
                <router-link to='/test'>
                  <el-menu-item index="1-2">test</el-menu-item>
                </router-link>
              </el-menu-item-group>

            </el-submenu>

          </el-menu>
        </div>
      </div>
      <div class="right-side">
        <div class="doc">
          <p>
            <system-information></system-information>
          </p>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  name: 'landing-page',
  components: { SystemInformation },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}
a {
  text-decoration: none;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}

.right-side {
  margin-left: 100px;
  display: flex;
  flex-direction: column;
}
</style>
