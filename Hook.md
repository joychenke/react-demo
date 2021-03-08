# Hook 介绍

## 使用 State Hook

1. useState Hook 让我们在函数组件中可以存储内部 state
2. useState() 传参是 state 属性的初始值。返回值是定义的 state 属性和设置属性的方法。

```javascript
// count是定义的state属性；setCount是设置count的方法，0是给count设置的初始值
const [count, setCount] = useState(0);
```

3. 一个函数组件可以使用多次 useState

## 使用 useEffect Hook

1. useEffect 的使用场景：告诉 React 组件，在渲染完成和 DOM 更新之后，去执行 effect 函数。

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

2. useEffect 可以有返回值，当 effect 返回函数(也叫清除函数)时，React 会在调用新的 effect 之前，先调一下清除函数，具体可看 hook.js 中的例子

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
  // 返回一个“清除函数”
  return () => {
    console.log("clean:", count);
  };
});
```

3. useEffect 清除函数的使用场景，还没有完全理解
4. 正如一个函数组件中可以使用`useState`一样，也可以使用多次`useEffect`
5. `useEffect`接收第二个参数, 用于跳过 effect 检测

```javascript
// count发生变化时，才会执行useEffect第一个参数中的两个console.log
useEffect(() => {
  console.log(
    "%c 点击了count：",
    "color:red;font-size:30px;",
    `click ${count} times.`
  );
  return () => {
    console.log("%c 组件卸载，销毁count", "color:red;font-size:30px;", count);
  };
}, [count]);
```

6. 如果 useEffect 的第二个参数数组包含多个元素，即使只有一个元素发生变化，React 也会执行 effect
7. 如果想执行只运行一次的 effect，第二个参数可传入空数组 []
