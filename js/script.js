class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
        };
    }

    render() {
         return (
          <div className="container">
            <div className="stop-controls">
                <nav className="controls">
                  <a href="#" className="button" id="start" onClick={this.start}>Start</a>
                  <a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
                </nav>
                <div className="stopwatch">
                  {this.format(this.times)}
                </div>
                <nav className="controls">
                  <a href="#" className="button" id="reset" onClick={this.resetManually}>Reset</a>
                  <a href="#" className="button" id="save" onClick={this.save}>Save</a>
                </nav>
                <ul className="results" id='results'></ul>
                <a href="#" className="button" id="clear" onClick={this.clear}>Clear list</a>
            </div>
          </div>
        )
    }

    reset = () => {
      this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      })
    }

    format = (times) => {
            return `${this.pad0(this.state.minutes)}:${this.pad0(this.state.seconds)}:${this.pad0(Math.floor(this.state.miliseconds))}`;
    };

    start = () => {
      if (!this.state.running) {
          this.setState({running: true});
          this.watch = setInterval(() => this.step(), 10);
      }
    };

    step = () => {
        if (!this.state.running) return;
        this.calculate();
    };

    calculate = () => {
      this.setState({miliseconds: this.state.miliseconds += 1});
      if (this.state.miliseconds >= 100) {
          this.setState({seconds: this.state.seconds += 1});
          this.setState({miliseconds: 0});
      }
      if (this.state.seconds >= 60) {
          this.setState({minutes: times.state.minutes += 1});
          this.setState({seconds: 0});
      }
    };

    stop = () => {
        this.state.running = false;
        clearInterval(this.watch);
    };

    resetManually = () => {
        this.state.running = false;
        clearInterval(this.watch);
        this.reset();
    };

    save = () => {
      var resultList = document.getElementById('results');
      var newTime = document.createElement('li');
      newTime.innerText = this.format(this.state.times);
      resultList.appendChild(newTime);
    };

    clear = () => {
      var clearList = document.getElementById('results');
      while (clearList.hasChildNodes()) {
        clearList.removeChild(clearList.firstChild);
      }
    };

    pad0 = (value) => {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    };


}

/* czemu nie można było z tego skorzystać - wyrzucało że np start to nie funkcja...?
var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());
var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetManually());
var saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());
var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());
*/

const stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById("stopwatch"));
