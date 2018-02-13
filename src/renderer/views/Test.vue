
<template>
  <main>
    <article>
      <h2>Code Run</h2>
      <h5>
        <router-link to="/">
          <el-button>go to home</el-button>
        </router-link>
      </h5>

      <form>
        <textarea ref="code" name="code">
          <?php
$a = array('a' => 1, 'b' => 2, 3 => 'c');

echo "$a[a] ${a[3] /* } comment */} {$a[b]} \$a[a]";

function hello($who) {
	return "Hello $who!";
}
?>
            <p>The program says
              <?= hello("World") ?>.</p>
            <script>
            alert('And here is some JS code') // also colored
            </script>
        </textarea>
      </form>

    </article>
  </main>
</template>

<style>
.CodeMirror {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
</style>


    <script>
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/php/php'

export default {
  data() {
    return { limao: 1 }
  },
  methods: {},
  mounted() {
    // this.$refs.code.value = 12312
    CodeMirror.fromTextArea(this.$refs.code, {
      lineNumbers: true,
      matchBrackets: true,
      mode: 'application/x-httpd-php',
      indentUnit: 4,
      indentWithTabs: true
    })
  }
}
</script>
