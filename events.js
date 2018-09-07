'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var e = React.createElement;

function pick(xs) {
  return xs[Math.floor(Math.random() * xs.length)];
}

var Person = function () {
  function Person(name, surname, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  _createClass(Person, [{
    key: "row",
    value: function row() {
      return [this.name, this.surname, this.age];
    }
  }, {
    key: "display",
    value: function display() {
      return "Person named " + this.name;
    }
  }], [{
    key: "random",
    value: function random() {
      return new Person(pick(["Neil", "Emily", "Henry"]), pick(["Mitchell", "Jones"]), Math.round(Math.random() * 40));
    }
  }, {
    key: "columns",
    value: function columns() {
      return ["name", "surname", "age"];
    }
  }]);

  return Person;
}();

var City = function () {
  function City(name, country) {
    _classCallCheck(this, City);

    this.name = name;
    this.country = country;
  }

  _createClass(City, [{
    key: "row",
    value: function row() {
      return [this.name, this.country];
    }
  }, {
    key: "display",
    value: function display() {
      return "City named " + this.name;
    }
  }], [{
    key: "random",
    value: function random() {
      return pick([new City("London", "UK"), new City("Cambridge", "UK"), new City("Paris", "France")]);
    }
  }, {
    key: "columns",
    value: function columns() {
      return ["name", "country"];
    }
  }]);

  return City;
}();

var Events = function (_React$Component) {
  _inherits(Events, _React$Component);

  function Events(props) {
    _classCallCheck(this, Events);

    var _this = _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this, props));

    _this.state = {
      events: [],
      people: [],
      cities: []
    };
    return _this;
  }

  _createClass(Events, [{
    key: "addPerson",
    value: function addPerson(person) {
      this.setState(function (state, props) {
        return { events: state.events.concat(person),
          people: state.people.concat(person) };
      });
    }
  }, {
    key: "addCity",
    value: function addCity(city) {
      this.setState(function (state, props) {
        return { events: state.events.concat(city),
          cities: state.cities.concat(city) };
      });
    }
  }, {
    key: "tick",
    value: function tick() {
      var rnd = Math.random();
      if (rnd > 0.8) this.addPerson(Person.random());
      if (rnd < 0.2) this.addCity(City.random());
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Events"
        ),
        React.createElement(Table, { columns: ["Display"], rows: this.state.events, fun: function fun(x) {
            return [x.display()];
          } }),
        React.createElement(
          "h3",
          null,
          "People"
        ),
        React.createElement(Table, { columns: Person.columns(), rows: this.state.people }),
        React.createElement(
          "h3",
          null,
          "Cities"
        ),
        React.createElement(Table, { columns: City.columns(), rows: this.state.cities })
      );
    }
  }]);

  return Events;
}(React.Component);

var Table = function (_React$Component2) {
  _inherits(Table, _React$Component2);

  function Table(props) {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            this.props.columns.map(function (e) {
              return React.createElement(
                "td",
                null,
                e
              );
            })
          )
        ),
        React.createElement(
          "tbody",
          null,
          this.props.rows.map(function (x) {
            return React.createElement(
              "tr",
              null,
              (_this4.props.fun ? _this4.props.fun(x) : x.row()).map(function (y) {
                return React.createElement(
                  "td",
                  null,
                  y
                );
              })
            );
          })
        )
      );
    }
  }]);

  return Table;
}(React.Component);

var domContainer = document.querySelector('#events');
ReactDOM.render(React.createElement(Events, null), domContainer);