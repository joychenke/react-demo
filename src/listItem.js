import React from "react" 
export class ListItem extends React.Component {
  render() {
    const liArr = this.props.numbers.map(num => {
      return (<li key={num+''}>{num}</li>);
    })
    return (<ul>{liArr}</ul>);
  }
}