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
3. 组价内部，有两个钩子函数（也叫生命周期方法），componentDidMount（组件挂载完成），componentWillUnmount（组件将要卸载）
4. React知道state改变后，会去重新调用 render() 方法，更新DOM
5. 不要直接修改state方法，而要用this.setState()来修改
6. setState的参数除了是对象，还可以是函数。函数接收两个参数，上一个state，和此时的props
  ```javascript
    this.setState((state, props) => {
      counter: state.counter + props.increment
    })
  ```
7. state的更新会被合并，很像Object.assign，只会修改改动过的那个state对象属性
8. react中数据是**自上而下，单向流动**的。state是局部的，只能自己改。当前组件的数据可以选择传给子组件，但是子组件并不知道props里的数据，来自于父的state还是prop，还是直接传的值

## 事件处理
1. 事件名的命名方式是小驼峰；传的是花括号括起来的事件处理函数，而不是字符串；
2. react的事件处理函数中自带合成事件e，是react封装好的，不需要考虑它跨浏览器的兼容性；
3. 阻止默认事件用e.preventDefault() 方法；为DOM添加监听器，只需要在元素初始渲染时添加；
4. 给事件传入自定义的事件方法时，要把this绑定为当前组件，有两种解决方法，bind和handleClick方法用箭头函数。具体看文档。
```javascript 
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
```
```javascript
  handleClick = () => {
    // 里面的this，是当前组件
  }
```
5. 向事件处理函数传参，可以直接用箭头函数的方式，也可以用bind方式，将要传的参数作为this后面的参数
```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 条件渲染
1. 条件渲染方法一：跟其他的js逻辑一样，用if来判断，render中需要渲染的元素
2. 条件渲染方法二：condition && JSX代码 的方式。当condition是false，返回值false，后面的JSX不会渲染；condition是true，返回值是JSX表达式，右侧的元素会渲染
3. 条件渲染方法三：三目运算表达式
4. 阻止条件渲染方法：让render方法返回null。返回null时，不会影响组件的生命周期。

## 列表 && key
1. 渲染多个表达式原理是：数组的map返回的数组(数组元素是JSX表达式)可直接渲染；JSX的花括号中可嵌入任何JavaScript表达式
2. 一个元素的key值，是这个元素在**列表中独一无二的字符串**
3. 元素的key值，应该放在数组上下文中（即，这个元素数组的元素时，要给这个元素加key，比如map处理数组项时的返回值）
4. 元素的key值，只需要在兄弟节点之间独一无二，不需要全局唯一
5. key只能作为元素的key属性，不会传给子组件。比如子组件中，不能读出父组件的 props.key
6. JSX表达式中，可以嵌入map
