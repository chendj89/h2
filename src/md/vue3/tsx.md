### vue3 tsx 父子组件的两种渲染写法：setup 和 render

在 Vue 3 中，使用 TSX（TypeScript JSX）语法编写组件时，可以使用两种不同的方式来渲染父子组件：setup 函数和 render 函数。它们之间的区别如下：

1. setup 函数：

- setup 函数是 Composition API 的一部分，用于设置组件的初始状态和行为。
- 在 setup 函数中，可以使用 defineComponent 函数或返回一个包含响应式数据和方法的对象。
- 使用 defineComponent 函数时，可以直接在 template 选项中编写模板，并使用 JSX 语法。
- 使用返回对象的方式时，可以在对象中定义 render 函数来渲染组件。
- setup 函数可以访问 props、context 等参数，并返回一个渲染函数或包含响应式数据和方法的对象。
- 适用于更复杂的组件，可以提供更灵活和可组合的方式来组织和重用逻辑。

2. render 函数：

- render 函数是 Vue 的渲染函数，用于控制组件的渲染逻辑。
- 在 render 函数中，可以使用 JSX 语法或 createElement 函数来创建组件的虚拟节点。
- render 函数接收一个 createElement 函数作为参数，并返回一个虚拟节点。
- render 函数不直接访问 props 和 context，而是通过 createElement 函数的参数来传递。
- 适用于简单的组件或需要更细粒度的控制渲染逻辑的场景。

总之，setup 函数适用于更复杂的组件，提供了更灵活和可组合的方式来组织和重用逻辑。而 render 函数适用于简单的组件或需要更细粒度的控制渲染逻辑的场景。在使用 TSX 编写父子组件时，可以根据具体需求选择使用 setup 函数或 render 函数来渲染组件。

首先我们先对比一下 template 和 jsx/tsx 的优缺点

虽然并没有提到 element3

但是这里还是要说一下我们团队的开发规范：

**优先选择 template ，当 template 写起来贼费劲时上 tsx**

其实这个也是官方推荐的。

“Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。”

首先我们先对比一下 template 和 jsx/tsx 的优缺点

**template**：

优点：

- 可读性高
- - 基于 dom 结构，很容易就可以看清楚代码要表达的意图（当然，写的一窝粥的除外）
  - 通过 vue 的指令和语法，一眼就能确定逻辑在哪里

缺点：

- 不够灵活
- - 也是一直被大家吐槽的点，过于笨重 SFC 享受不到 props 类型提示
- - 受限于 SFC，组件在外部使用时 vscode 无法做出 props 的类型提示
  - 这一点对于组件库来讲是个痛点，我希望用户在使用组件时可以享受到 props 的类型提示

**jsx/tsx**:

优点：

- 灵活
- - 可以利用 js 来表达各种各样的逻辑，十分灵活可享受 props 类型提示
- - 如果是用 tsx 编写的组件，用户是可以享受到 props 的类型提示的

缺点：

- 编译优化？
- - 这一点也是大家质疑的点，担心如果使用 jsx 的话，是不是享受不到模板编译的优化了
  - 如果按照 @vue/babel-plugin-jsx 这个插件提供的 explorer 来看的话是可以享受到模板编译优化的
  - 但是我用 vue-cli 创建了一个新的 vue3 项目，从编译结果上来看，并没有享受到编译优化，不知道是后续会更新，还是有 bug
  - 在 element3 中使用的是 rollup 来打包，对应用 jsx/tsx 编写的组件是享受到编译优化了
  - 所以这一块是没啥问题的，当然还不能确定用 jsx 可以得到和用 template 同等的编译优化（特殊情况下是否还会有编译优化呢）

- 可读性差
- - 这个其实也是过于灵活带来的后遗症，就是因为太灵活了，大家怎么写的都有，很容易出现坏味道

    - 要不就在 setup 中通过函数返回，要不就在 render 函数中实现，
    - - 但是如果你在 setup 中直接返回的话，其实是破坏了 setup 返回对象作为 view 和 model 层的接口，而且如果是 ref 类型的响应式对象的话，你还必须使用 .value ,享受不到结构 ref 了。你会发现你的代码可读性极差，
    - 我更推荐在 render 中实现
    - - 但是你调用的时候必须要加个 render(ctx), ctx 相当于是 this，还是不如在 template 中干净

```js
// setup 直接返回一个函数
const Foo = {
  setup() {
    const count = ref(0)
    // 返回一个函数
    // 如果是返回一个对象的话，这个对象其实可以看做 view 和 model 之间的接口层，
    // 但是返回一个函数的话，就破坏了
    // 必须对 ref 类型的响应式对象使用 .value
    return () => <div>{count.value}</div>
  }
}
```

```js
// render 中实现
const Foo = {
  setup() {
    const count = ref(0)
    return { count }
  },
  render(ctx) {
    // 必须调用 ctx
    return <div>{ctx.count}</div>
  }
}
```

至于为什么别的组件库都用 jsx/tsx 的问题，其实很多组件库都有之前的包袱，为了可以快速的支持 vue3 ，基本上就是改一改废弃的语法，别报错，能跑起来即可

所以如果之前组件库是用 jsx/tsx 写的，你会发现现在依然是

如果之前组件库是用 options api 写的，你会发现现在依然是

当然了，现在这个阶段大家也都在积极的切到 composition api 上去。

对于我来讲 可读性大于灵活性

而且 templete 会享受到所有的编译优化

不管是从可读性上还是性能上我都推荐优先使用 templete

当逻辑必须要用 jsx/tsx 来实现的话 在上
