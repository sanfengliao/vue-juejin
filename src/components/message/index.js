import Vue from 'vue' // 引入 Vue
import MessageMain from './src' // 引入上边定义好的 message 模板
const MessageBox = Vue.extend(MessageMain) // 使用 Vue.extend 来创建一个构造器
let instance // instance 变量用来保存实例
let timer = null // timer 变量用来保存定时器
// 定义一个 function, 参数为 options, 默认为一个对象
const Message = function(options = {}) {
  // 如果当前处在服务器端, 则直接返回
  if(Vue.prototype.$isServer) return
  // 如果当前定时器已开启, 说明页面上已经有一个 message-box 了, 则不能再继续创建新的 message-box
  if(timer) return
  // 对 options 做处理, 如果直接传入 string, 则使其保存在 options 的 message 属性上
  if(typeof options === 'string') {
    options = {
      message: options
    }
  }
  // 初始化实例, 并将 options 作为新的 data 传入, Vue 会将 options 合并到原有的 data 上, 覆盖原有的默认值, 但是, 在 options 中没有设置的是不会被改变的
  instance = new MessageBox({
    data: options
  })
  // 调用 $mount 方法, 将当前实例渲染为真实 DOM, 生成 $el,, 如果不执行这一步, 将拿不到 $el 的值, 但是不指定 DOM 节点接管当前实例
  instance.vm = instance.$mount()
  // 使用原生 JS 的 API 将当前实例的真实 DOM 追加到 body 中
  document.body.appendChild(instance.vm.$el)
  // 实例上的 vm 就是我们的 Vue 组件, 所以我们可以通过 vm 访问到当前实例中的所有属性
  // 将 visible 设置为 true, 即显示当前 message-box
  instance.vm.visible = true
  // 开启定时器
  timer = setTimeout(() => {
    // 在时间结束后将当前实例手动卸载
    instance.vm.visible = false
    // 使用原生 API 将当前实例生成的 DOM 节点在真实的 DOM 树中删除
    setTimeout(() => {
      instance.vm.$destroy()
      instance.vm.$el.parentNode.removeChild(instance.vm.$el)
      timer = null
    }, 500)

    // 清除定时器
  }, instance.vm.duration)
  // 定时器的时间使用 vm 中定义的时间
  return instance.vm
}
// 最终抛出一个对象, 对象上我们可以使用 install 来扩展 Vue 的插件
// 当我们的对象上有 install 方法的时候, 它接收第一个参数为 Vue,
// 我这里为了方便使用, 还在当前抛出的对象上定义了一个 message 方法, 为了方便在 axios 的拦截器中使用
export default {
  message: Message,
  install(Vue) {
    Vue.prototype.$message = Message
    Vue.message = Message
  }
}