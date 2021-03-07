# 高级指引
## 非受控组件
1. 受控组件上绑定的是state或props上的属性；不受控组件绑定的是constructor中定义在this上的属性
2. 非受控组件的定义、变量的声明、变量的取值分别是：
```javascript
  // 组件的定义： 没有onChange事件，定义在ref属性上面
  <input type="file" ref={this.fileIpt}></input>
  // 声明: constructor方法中声明
  this.fileIpt = React.createRef()
  // 取值：DOM元素挂载在current属性下面
  const val = this.fileIpt.current.files[0]
```
3. 受控组件和非受控组件相关文档：https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
4. 非受控组件上绑定的属性更改了，render方法不会被触发更新
5. defaultValue属性，可以给非受控组件绑定默认值(checkbox和radio是defaultChecked)
6. type是file的input始终是一个非受控组件。它的值只能由用户设置，而不能通过代码控制。应该始终用ref的方式，给file组件进行交互。