## 说明：
这是参照官网做的react 棋盘小游戏，接触react做的第一个小demo

## 技术点
对比Vue 2.0，从这个小demo

	1. 组件类的 render 的返回值，是需要渲染的html
	2. 组件类的非render方法，类似Vue中的methods中定义的方法
	3. 在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。
	4. 函数组件, 可以省掉props前的this属性
	5. 当想要for循环渲染多个元素时, 将多个需要渲染的元素放在数组内
	6. 修改组件样式，给组件绑定className属性
	7. 新组件的内容，继承自React.Component；组件渲染，用 ReactDOM.render
	8. 给受控组件传值用花括号,无需引号; 受控组件,要修改父组件的变量, 通过事件从受控组件传向父组件,向父组件传值,在父组件中修改
	9. 组件修改自身属性,用 setState方法
	10. 定义在组件constructor方法,state对象上的属性,是响应式的,当这些属性改变时，会自动触发组件内的render方法。

