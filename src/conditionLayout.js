import  React  from "react";
/* 
通过按钮，切换显示那一句
*/
export class ConditionLayout extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      iptVal: '1'
    }
  }
  handleChange(ev) {
    const value = ev.nativeEvent.data
    this.setState({
      iptVal: value
    })
  }
  render() {
    const iptVal = this.state.iptVal
    let element = null
    // 除了输入的是 字符串1或者2，其他情况都不渲染
    switch (iptVal) {
      case '1':
        element = (<h1>我是1</h1>);
        break;
      case '2':
        element = (<h2>我是2</h2>);
        break;
      default:
        break;
    }
    return (
      <div>
        <input onChange={this.handleChange} type="text"></input>
        {element}
      </div> 
    );
  }
}