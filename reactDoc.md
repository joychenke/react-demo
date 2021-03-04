# 官网的入门教程
## JSX介绍
1. 代码里面，这样的语句 
`const element = <h1>Hello, {formatName(user)}</h1>` ，标签外面最好加上括号和分号 `const element = (<h1>Hello, {formatName(user)}</h1>);`
2. JSX 是一个表达式。里面传字符串用引号，传变量用花括号。花括号和引号只能二选一。不能一起用。
3. JSX语法更接近js，class是className，tabindex是tabIndex，都是用的驼峰命名法

### 元素渲染
1. 大多数 React 应用只会调用一次 ReactDOM.render()

## 组件和props
1. 组件名称必须以大写字母开头，React会将小写字母开头的组件视为原生DOM标签
2. 使用函数声明或class声明，都不能修改自身的props

## State & 生命周期
1. state只能定义在构造函数中，是当前组件私有的，完全受控于当前组件
2. 当前组件中的方法，可以直接通过this.setState() 方法来修改state对象中存的属性
3. 组价内部，有两个钩子函数（也叫生命周期方法），componentDidMount（组件挂载完成），componentDidMount（组件将要卸载）
4. React知道state改变后，会去重新调用 render() 方法，更新DOM
5. 不要直接修改state方法，而要用this.setState()来修改
6. setState的参数除了是对象，还可以是函数
  ```javascript
    this.setState(() => {
      counter: state.counter + props.increment
    })
  ```
7. state的更新会被合并，很像Object.assign，只会修改改动过的那个state对象属性
8. react中数据是自上而下，单向流动的。state是局部部的，只能自己改。当前组件的数据可以选择传给子组件，但是子组件并不知道props里的数据，来自于父的state还是prop，还是直接传的值