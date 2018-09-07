'use strict';

const e = React.createElement;

function pick(xs) {
  return xs[Math.floor(Math.random()*xs.length)];
}

class Person {
  constructor(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }
  static random(){return new Person(pick(["Neil","Emily","Henry"]),pick(["Mitchell","Jones"]),Math.round(Math.random()*40));}

  static columns(){return ["name","surname","age"];}
  row(){return [this.name, this.surname, this.age];}
  display(){return "Person named " + this.name;}
}

class City {
  constructor(name, country) {
    this.name = name;
    this.country = country;
  }
  static random(){return pick([ new City("London","UK"), new City("Cambridge","UK"), new City("Paris","France")]);}
  static columns(){return ["name","country"];}
  row(){return [this.name, this.country];}
  display(){return "City named " + this.name;}
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      people: [],
      cities: []
    };
  }

  addPerson(person)
  {
    this.setState((state, props) => {
      return {events: state.events.concat(person)
             ,people: state.people.concat(person)};
    });
  }

  addCity(city)
  {
    this.setState((state, props) => {
      return {events: state.events.concat(city)
             ,cities: state.cities.concat(city)};
    });
  }

  tick() {
    const rnd = Math.random();
    if (rnd > 0.8) this.addPerson(Person.random());
    if (rnd < 0.2) this.addCity(City.random());
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
        <div>
          <h3>Events</h3>
          <Table columns={["Display"]} rows={this.state.events} fun={x => [x.display()]} />
          <h3>People</h3>
          <Table columns={Person.columns()} rows={this.state.people} />
          <h3>Cities</h3>
          <Table columns={City.columns()} rows={this.state.cities} />
        </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table>
        <thead>
          <tr>{this.props.columns.map(e => <td>{e}</td>)}</tr>
        </thead>
        <tbody>
          {this.props.rows.map(x =>
            <tr>
              {(this.props.fun ? this.props.fun(x) : x.row()).map(y => <td>{y}</td>)}
            </tr>
          )}
          </tbody>
      </table>
    );
  }
}

const domContainer = document.querySelector('#events');
ReactDOM.render(<Events />, domContainer);
