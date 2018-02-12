<template>
  <main>
    <codemirror v-model="code" :options="cmOption"></codemirror>
  </main>
</template>

<script>
console.log("234567898765432345678876543456789", window.CodeMirror);
import Vue from "vue";

// 载入 codemirror 组件
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/php/php";

window.CodeMirror = CodeMirror;

import VueCodemirror from "vue-codemirror";

Vue.use(VueCodemirror);
export default {
  data() {
    return {
      code: `<?php \necho 12;\narray_merge(13,12); ?>`,
      cmOption: {
        lineNumbers: true,
        matchBrackets: true,
        mode: "application/x-httpd-php",
        indentUnit: 4,
        indentWithTabs: true
      }
    };
  },
  methods: {
    mounted() {
      console.log("this is current codemirror object", this.codemirror);
      // you can use this.codemirror to do something...
    }
  }
};
</script>
