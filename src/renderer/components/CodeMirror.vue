<template>
<main>
  <h1>Hello World!</h1>
  <codemirror v-model='code' :options='cmOption'></codemirror>

</main>

</template>

<script>
    //   import CodeMirror from 'codemirror/lib/codemirror'
export default {
  data () {
        return {
          code: 'const A = 10',
          cmOption: {
            tabSize: 4,
            styleActiveLine: true,
            lineNumbers: true,
            line: true,
            foldGutter: true,
            styleSelectedText: true,
            mode: 'text/javascript',
            keyMap: 'sublime',
            matchBrackets: true,
            showCursorWhenSelecting: true,
            theme: 'monokai',
            extraKeys: { 'Ctrl': 'autocomplete' },
            hintOptions: {
              completeSingle: false
            }
          }
        }
  }
}
</script>

<style lang="scss">
  // @import './sass/mixins';
  // @import './sass/variables';
  main {
    position: relative;
  }
</style>
