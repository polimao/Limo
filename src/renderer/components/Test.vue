<template>
  <router-link to="/">to home</router-link>
</template>

<script>
console.log(21);
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

const os = require("os");
const userInfo = os.userInfo();
console.log(userInfo);
</script>