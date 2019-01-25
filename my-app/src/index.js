import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fondo: '#fff'
    };

    this.mouseover = this.mouseover.bind(this);
  }
  mouseover(e) {
    this.props.onMouseMove(e);

    this.setState({
      fondo: '#eee'
    });
  }
  render() {
    const {fondo} = this.state;
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()} 
        onMouseMove={this.mouseover} 
        style={{backgroundColor:  fondo}}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), 
      x:0, 
      y:0
    };

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }
  
  renderSquare(i) {
    return <Square value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
            onMouseMove={this.onMouseMove}></Square>;
  }

  render() {
    const status = 'Next player: X';

    const { x, y } = this.state;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="extra-info">{x} {y}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
