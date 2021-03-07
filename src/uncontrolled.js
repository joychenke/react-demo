import React from "react"
export class Uncontrolled extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.iptVal = React.createRef()
    this.addVal = React.createRef()
    this.fileIpt = React.createRef()
  }
  handleSubmit(ev) {
    console.log('%c iptVal','color:red;font-size:30px;', this.iptVal.current.value)
    console.log('%c addVal','color:red;font-size:30px;', this.addVal.current.value)
    console.log('%c fileIpt','color:red;font-size:30px;', this.fileIpt.current.files[0])
    ev.preventDefault()
  }
  render() {
    console.log('%c render更新了~','color:red;font-size:30px;', )
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.iptVal}></input>
        </label>
        <label>
          address:
          <input type="text" defaultValue="xiuyan road" ref={this.addVal}></input>
        </label>
        <label>
          file input:
          <input type="file" ref={this.fileIpt}></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}