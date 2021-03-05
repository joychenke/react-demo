import React from 'react'
class LoginButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOn: true
    }
    // 方法一，使用绑定方法绑定this
    this.handleClickB = this.handleClickB.bind(this)
  }
  handleClickA(e) {
    e.preventDefault()
  }
  // 方法二：方法定义的时候，用箭头函数
  handleClickB = () => {
    this.setState({
      isOn: !this.state.isOn 
    })
  }
  // 方法一，使用绑定方法绑定this
  // handleClickB() {
  //   this.setState({
  //     isOn: !this.state.isOn
  //   })
  // }
  render() {
    return (
      <div>
        <a href="https://www.baidu.com/" onClick={this.handleClickA}>点击，跳转到百度</a>
        <button onClick={this.handleClickB}>{this.state.isOn ? '开' : '关'}</button>
      </div>
    );
  }
}
export default LoginButton