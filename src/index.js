import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// 修改成函数组件Square，绑定的方式还是花括号
function Square(props) {
  return (
  <button 
    className="square" 
    // 函数组件，不需要写this
    onClick={props.onClick}>
    {props.value}
  </button>);
}

// 向受控组件，传参数，
class Board extends React.Component {
  renderSquare(i,j) {
    return (<Square 
    value={this.props.squares[i]}
    key={j}
    onClick={() => this.props.onClick(i)}/>);
  }

  render() {
    const result = []
    for(let i = 0; i < 3; i ++) {
      let arr = []
      for(let j = 0; j < 3;  j ++){
        arr.push(this.renderSquare(i*3 + j, 'x_'+j+i))
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
    if(calcuateWinner(squares) || squares[i]){
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
    const winner = calcuateWinner(current.squares);
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
    let status = ""
    if(winner) {
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
            // 这里的入参i，由受控组件传过来的
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button onClick={() => this.handleSort()}>{sortBtnLabel}</button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
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
  for(let i = 0; i < lines.length; i ++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
};