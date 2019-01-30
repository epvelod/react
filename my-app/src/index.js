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
class Titulo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {currentCount:0};

    this.timer = this.timer.bind(this);
  }
  
  componentDidMount() {
    var intervalId = setInterval(this.timer, 50);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
    const children = this.props.children + '';
    if(this.state.currentCount >= children.length){
      this.setState({ currentCount: -9 });
      clearInterval(this.state.intervalId);
    }
    else
      this.setState({ currentCount: this.state.currentCount + 1 });
  }

  render() {
    const children = this.props.children + '';
    const title = this.state.currentCount>=0?children.substring(0, this.state.currentCount)+'_':children;

    return (
      <div className="ln-titulo">{title}</div>
    );
  }
} 
class Game extends React.Component {
  render() {
    const Background = './images/background_image.jpg';
    const backgroundImage = `url(${Background})`;
    return (
      <div className="game" 
      style={{backgroundImage:backgroundImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'}}>
        <div className="game-board">
          <Titulo subttitulo="Se ve turbo vergas">Pruebas de react.</Titulo>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
