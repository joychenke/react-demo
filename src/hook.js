import { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(true);
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
  useEffect(() => {
    console.log("%c 在线否：", "color:red;font-size:30px;", isOn);
  }, [isOn]);
  return (
    <div>
      <span onClick={() => setIsOn(!isOn)}>{isOn ? "在线" : "不在线"}</span>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  );
}
export default Example;
