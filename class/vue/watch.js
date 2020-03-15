export class Watcher {
  constructor (node, attr, data, key) {
    this.node = node
    this.attr = attr
    this.data = data
    this.key = key
  }

  update () {
    console.log(this.attr, this.key)
    this.node[this.attr] = this.data[this.key]
    // 数据更新，通过node.innerhtml和node.value方式
  }
}