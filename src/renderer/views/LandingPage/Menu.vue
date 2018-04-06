<template>
  <main>
    <router-link to='/file-compare'>
      <el-button size="mini" type="info">文件对比</el-button>
    </router-link>
    <router-link to='/host-manager'>
      <el-button size="mini" type="success">Host管理</el-button>
    </router-link>
    <router-link to='/code-mirror'>
      <!-- <el-button size="mini" type="danger"></el-button>  -->
    </router-link>
    <router-link to='/code-run'>
      <!-- <el-button size="mini" type="danger"></el-button>  -->
    </router-link>
    <!--                 <router-link to='/help'>
  <el-button size="mini" type="danger"></el-button> 
      </router-link> -->
    <router-link to='/test'>
      <!-- <el-button size="mini" type="danger"></el-button>  -->
    </router-link>
  </main>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped>
  button {
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
</style>
