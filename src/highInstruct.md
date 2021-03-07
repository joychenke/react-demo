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

## 代码分割
1. 应用中引入代码分割的最佳方式是通过import()方法
```javascript
  import("./math.js").then(math => {
    console.log(math.add(2, 6))
  })
```
2. React.lazy 和 Suspense 技术还不支持服务端渲染
3. React.lazy 和 Suspense一起用的例子
```javascript
  const OtherComponent = React.lazy(() => import(./OtherComponent))
  const AnotherComponent = React.lazy(() => import(./AnotherComponent))
  <Suspense fallback={<div>Loading...</div>}>
    <section>
      <OtherComponent/>
      <AnotherComponent/>
    </section>
  </Suspense>
```
4. React.lazy只支持默认导出，如果想引入的模块支持具名导出，可以创建一个中间模块