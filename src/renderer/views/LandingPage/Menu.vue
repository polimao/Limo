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
    return {

    }
  }
}
</script>

<style scoped>


</style>
