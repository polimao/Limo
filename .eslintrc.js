module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 1,
    // allow async-await
    'generator-star-spacing': 1,

    /*eslint : ["error", "double", { "avoidEscape": true }]*/

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,


    // 禁止不必要的分号
    "no-extra-semi": 1,
    "semi": 1,
    "quotes": 1,
    "indent": 1,
    'keyword-spacing' : 1,
    'space-before-function-paren' : 1,
    'space-infix-ops' : 1,
    'no-multiple-empty-lines' : 1,

  }
}
