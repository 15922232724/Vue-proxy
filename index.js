console.log(1)
import Vue from './class/vue/index.js'
window.onload = function () {
  window.$app = new Vue({
    el: '#app',
    data: {
      num: 0
    },
    methods: {
      add () {
        this.num++
      },
      sub () {
        this.num--
      }
    }
  })
}