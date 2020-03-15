
import Watcher from './watch'
export class Vue {
  constructor (options) {
    this.$el = document.querySelector(options.el)
    this.$methods = options.methods
    this._binding = {}
    console.log(this)

    this._observe(options.data)


    this._compile(this.$el)
  }
  _pushWatcher (watcher) { // 初始化订阅者仓库
    if (!this._binding[watcher.key]) {
      this._binding[watcher.key] = []

    }
    this._binding[watcher.key].push(watcher)
  }

  _observe (data) { // 初始化数据，使用proxy进行代理
    console.log(data)
    var that = this
    this.$data = new Proxy(data, {
      set (target, key, value) {

        let res = Reflect.set(target, key, value)
        // redflect进行数据更新，res为更新状态

        that._binding[key].map(item => { // 发布通知，告诉所有订阅者绑定的key更新了，进行对应操作
          item.update()
        })
        return res
      }
    })
  }
  _test () {
    console.log(1)
  }
  _compile (root) { // 定义订阅者
    const nodes = [...root.children]

    let data = this.$data

    nodes.map(node => {

      if (node.hasAttribute('v-bind')) {
        let key = node.getAttribute('v-bind')
        console.log(node, data, key)
        this._pushWatcher(new Watcher(node, 'innerHTML', data, key))
      }
      if (node.hasAttribute('v-model')) {
        let key = node.getAttribute('v-model')
        this._pushWatcher(new Watcher(node, 'value', data, key))
        node.addEventListener('input', () => {
          data[key] = node.value
          console.log(this.$data)
        })
      }
      if (node.hasAttribute('v-click')) {
        let methodName = node.getAttribute('v-click')
        let mothod = this.$methods[methodName].bind(data)
        node.addEventListener('click', mothod)
      }

      if (node.children.length > 0) {

        this._complie(node)

      }
    })
  }
}