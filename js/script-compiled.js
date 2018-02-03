"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.reset = function () {
            _this.setState({
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            });
        };

        _this.format = function (times) {
            return _this.pad0(_this.state.minutes) + ":" + _this.pad0(_this.state.seconds) + ":" + _this.pad0(Math.floor(_this.state.miliseconds));
        };

        _this.start = function () {
            if (!_this.state.running) {
                _this.setState({ running: true });
                _this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        };

        _this.step = function () {
            if (!_this.state.running) return;
            _this.calculate();
        };

        _this.calculate = function () {
            _this.setState({ miliseconds: _this.state.miliseconds += 1 });
            if (_this.state.miliseconds >= 100) {
                _this.setState({ seconds: _this.state.seconds += 1 });
                _this.setState({ miliseconds: 0 });
            }
            if (_this.state.seconds >= 60) {
                _this.setState({ minutes: times.state.minutes += 1 });
                _this.setState({ seconds: 0 });
            }
        };

        _this.stop = function () {
            _this.state.running = false;
            clearInterval(_this.watch);
        };

        _this.resetManually = function () {
            _this.state.running = false;
            clearInterval(_this.watch);
            _this.reset();
        };

        _this.save = function () {
            var resultList = document.getElementById('results');
            var newTime = document.createElement('li');
            newTime.innerText = _this.format(_this.state.times);
            resultList.appendChild(newTime);
        };

        _this.clear = function () {
            var clearList = document.getElementById('results');
            while (clearList.hasChildNodes()) {
                clearList.removeChild(clearList.firstChild);
            }
        };

        _this.pad0 = function (value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        };

        _this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "stop-controls" },
                    React.createElement(
                        "nav",
                        { className: "controls" },
                        React.createElement(
                            "a",
                            { href: "#", className: "button", id: "start", onClick: this.start },
                            "Start"
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "button", id: "stop", onClick: this.stop },
                            "Stop"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "stopwatch" },
                        this.format(this.times)
                    ),
                    React.createElement(
                        "nav",
                        { className: "controls" },
                        React.createElement(
                            "a",
                            { href: "#", className: "button", id: "reset", onClick: this.resetManually },
                            "Reset"
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "button", id: "save", onClick: this.save },
                            "Save"
                        )
                    ),
                    React.createElement("ul", { className: "results", id: "results" }),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", id: "clear", onClick: this.clear },
                        "Clear list"
                    )
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

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

var stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById("stopwatch"));
