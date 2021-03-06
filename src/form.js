import React from 'react'
// 渲染一个可输入姓名的组件
export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeComment = this.handleChangeComment.bind(this)
    this.handleChangeSkill = this.handleChangeSkill.bind(this)
    this.handleChangePro = this.handleChangePro.bind(this)
    this.handleChangeSecondForm = this.handleChangeSecondForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      value: "",
      profession: "tester",
      skillArr: [],
      comment: "自我评价默认有值的",
      address: "",
      editIpt: "hi",
      isMarried: false,
    }
  }
  handleChangeComment(ev) {
    this.setState({
      comment: ev.target.value
    })
  }
  handleChangeSkill(ev) {
    const skillArr = [...this.state.skillArr]
    const value = ev.target.value
    const index = skillArr.findIndex(item => item === value)
    if (index === -1) {
      skillArr.push(value)
    } else {
      skillArr.splice(index, 1)
    }
    this.setState({
      skillArr: skillArr
    })
  }
  handleChange(ev) {
    this.setState({
      value: ev.target.value
    })
  }
  handleChangePro(ev) {
    this.setState({
      profession: ev.target.value
    })
  }
  handleSubmit(ev) {
    ev.preventDefault()
    console.log('%c form', 'color:red;font-size:30px;', this.state)
  }
  handleChangeSecondForm(ev) {
    const {name, value} = ev.target
    const iptVal = name === "address" ? value : ev.target.checked
    this.setState({
      [name]: iptVal
    })
    if(name !== "address") {
      const val = iptVal ? null : "hi"
      this.setState({
        editIpt: val,
      })
    }
  }
  render() {
    const professionList = [{
      name: "程序员",
      value: "coder"
    }, {
      name: "软件测试",
      value: "tester"
    }, {
      name: "文秘",
      value: "clerk"
    }]

    const skillList = [{
      name: "前端Vue",
      value: "vue"
    }, {
      name: "前端React",
      value: "react"
    }, {
      name: "后端Node",
      value: "node"
    }]
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            textarea 多行输入框：
        <textarea value={this.state.comment} onChange={this.handleChangeComment}></textarea>
          </label>
          <label>
            输入框：
      <input type="text" value={this.state.value} onChange={this.handleChange}></input>
          </label>
          {/* 单选下拉框 */}
          <label>
            想做的职业：
        <select value={this.state.profession} onChange={this.handleChangePro}>
              {
                professionList.map(pro => <option value={pro.value} key={pro.value}>{pro.name}</option>)
              }
            </select>
          </label>
          {/* 多选的下拉框 */}
          <label>
            多选下拉框：
        <select value={this.state.skillArr} onChange={this.handleChangeSkill} multiple={true} >
              {
                skillList.map(skill => <option value={skill.value} key={skill.value}>{skill.name}</option>)
              }
            </select>
          </label>
          <input type="submit" value="提交"></input>
        </form>
        {/* 第二个form表单 */}
        <form >
          <label>
            表单元素共用一个onChange事件1：
            <input value={this.state.address} name="address" type="text" onChange={this.handleChangeSecondForm}></input>
          </label>
          <label>
            表单元素共用一个onChange事件2：
            <input checked={this.state.isMarried} name="isMarried" type="checkbox" onChange={this.handleChangeSecondForm}></input>
          </label>
          {/* <label>
            受控输入为null，or undefined时，可编辑：
            <input value={this.state.editIpt}/>
          </label> */}
        </form>
      </div>
    );
  }
}