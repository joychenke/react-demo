# Hook 介绍

## 使用 State Hook

1. useState Hook 让我们在函数组件中可以存储内部 state
2. useState() 传参是 state 属性的初始值。返回值是定义的 state 属性和设置属性的方法。

```javascript
// count是定义的state属性；setCount是设置count的方法，0是给count设置的初始值
const [count, setCount] = useState(0);
```

3.
