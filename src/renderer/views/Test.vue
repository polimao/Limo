<template>
  <main>
    <router-link to="/">to home</router-link>

    HTML代码：
    <!-- <div class="horizontal stripes"></div>
    <div class="vertical stripes"></div>
    <div class="picnic stripes"></div>
    <div class="angled stripes"></div> -->
    <div class="angled-135 stripes"></div>
    <!-- <div class="checkered stripes"></div> -->
  </main>
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

<style>
.stripes {
  height: 25px;
  width: 37px;
  float: left;
  margin: 10px;
  background-size: 5px 5px; /* 控制条纹的大小 */
  box-shadow: 1px 1px 8px gray;
}

.angled-135 {
  background-color: #ddd;
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
</style>
