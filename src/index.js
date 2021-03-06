import React from 'react'
import ReactDOM from 'react-dom'
import Clock from "./clock.js"
import ClickEvent from"./clickEvent.js"
import {ConditionLayout} from "./conditionLayout.js"
import {ListItem} from "./listItem.js"
import { Form } from './form.js'
import { Calculator } from './statusElevate.js'
import { Combination } from './combination.js'
import './index.css'

// 修改成函数组件Square，绑定的方式还是花括号
function Square(props) {
  return (
  <button 
    className={props.cName + ' square'} 
    // 函数组件，不需要写this
    onClick={props.onClick}>
    {props.value}
  </button>);
}

// 向受控组件，传参数，
class Board extends React.Component {
  setSquareColor(i) {
    return this.props.wLine.includes(i) ? 'bgColor' : ''
  }

  renderSquare(i, key) {
    return (<Square 
    value={this.props.squares[i]}
    cName={this.setSquareColor(i)}
    key={key}
    onClick={() => this.props.onClick(i)}/>);
  }

  render() {
    const result = []
    for(let i = 0; i < 3; i ++) {
      let arr = []
      for(let j = 0; j < 3;  j ++){
        arr.push(this.renderSquare(i*3 + j, j))
      }
      result.push(<div className="board-row" key={i}>
        {arr}
      </div>)
    }
    return result
  }
}

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      stepAxis: new Map([[0, [0, 0]]]),
      isFromClick: false,
      isAscend: true,
      xIsNext: true
    }
  }

  handleClick(i) {
    // 保证未来不正确的历史记录被丢弃掉
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // current: { squares}, key是squares的对象
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 分出胜负，or 输入框有值，不处理
    if(calcuateWinner(squares).winner || squares[i]){
      return
    }
    // xIsNext是true，填入X，否则填入O
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    // 用 setState 修改state中的变量
    const stepNumber = history.length
    this.setState({
      history: history.concat([{squares}]),
      stepNumber,
      xIsNext: !this.state.xIsNext,
      isFromClick: false,
      // row = 商加1， col = 余数加1
      stepAxis: this.state.stepAxis.set(stepNumber, [Math.floor(i % 3 + 1), Math.floor(i / 3 + 1)])
    })
  }

  handleSort() {
    this.setState({
      isAscend: !this.state.isAscend
    })
  }

  jumpTo(step) {
    // 只改变了步骤，说明数据是响应式的
    this.setState({
      stepNumber: step,
      isFromClick: true,
      xIsNext: (step % 2) === 0
    })
  }

  // render里用到的变量是响应式的
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const {winner, wLine = []} = calcuateWinner(current.squares);
    const isAscend = this.state.isAscend

    // 根据升序降序，显示不同的
    const moves = []
    history.forEach((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to start'
      const [col, row] = this.state.stepAxis.get(move)
      let acitveClass = 'normalBtn'
      if((history.length >= this.state.stepNumber + 1) && move === this.state.stepNumber && this.state.isFromClick) {
        acitveClass = 'boldBtn'
      }
      const liItem = (<div key={move} className="moveClass">
        <span>{move}.</span>
        <ol>
          <button onClick={() => this.jumpTo(move)} className={acitveClass}>{desc}, 列：{col}， 行：{row}</button>
        </ol>
      </div>);
      if(isAscend){
        moves.push(liItem)
      }else {
        moves.unshift(liItem)
      }
    })
    const isDraw = !winner && current.squares.every(item => !Object.is(item, null))
    let status = ""
    if(isDraw) {
      status = "It's a draw"
    }else if(winner) {
      status = `This winner is:${winner}`
    }else {
      status = `Next player is: ${this.state.xIsNext ? 'X' : 'O'}`
    }
    const sortBtnLabel = isAscend ? '升序' : '降序'
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            wLine={wLine}
            // 这里的入参i，由受控组件传过来的
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button onClick={() => this.handleSort()}>{sortBtnLabel}</button>
          <div className={isDraw ? 'bigWord' : ''}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
const element = (
  <div>
    <Game />
    <ClickEvent/>
    <ConditionLayout/>
    <ListItem numbers={[1,2,3,'4','a']}/>
    <Form/>
    <Clock></Clock>
    <hr></hr>
    <Calculator></Calculator>
    <Combination></Combination>
  </div>
)
ReactDOM.render(
  element,
  document.getElementById('root')
);

function calcuateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return lines.reduce((result, arr) => {
    let winner = '', wLine = []
    const [a, b, c] =  arr
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a]
      wLine = [...arr]
    }
    // 有赢的
    if(winner){
      result.winner = winner
      result.wLine = Array.from(new Set([...wLine, ...result.wLine]))
    }
    return result
  }, {winner: "", wLine: []})
};