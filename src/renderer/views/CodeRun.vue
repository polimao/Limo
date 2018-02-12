<template>
    <main>
        <router-link to="/">go to home </router-link>
        <span>mode: {{ cmOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ cmOption.theme }}</span>
        <div class="codemirror">
            <!-- codemirror -->
            <codemirror v-model="code" :options="cmOption"></codemirror>
        </div>
    </main>
</template>

<script>
// CodeMirror.defineMode("mymode", () => {
//   return {
//     token(stream, state) {
//       if (stream.match("const")) {
//         return "keyword";
//       } else if (stream.match("111")) {
//         return "number";
//       } else {
//         stream.next();
//         return null;
//       }
//     }
//   };
// });
export default {
  data() {
    return {
      code: `<?php \necho 12;\narray_merge(13,12)`,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'application/x-httpd-php',
        theme: 'solarized light'
      }
    }
  }
}
</script>
