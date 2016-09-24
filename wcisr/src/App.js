import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import Request from 'superagent'

class App extends Component {

  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    var url = 'http://127.0.0.1:8080/games';
    Request.get(url).then((response) => {
      this.setState({
        games: response.body
      })
    })
  }

  render() {
    console.log(this.state)
    var games = _.map(this.state.games, (game) => {
      return <li>{game}</li>;
    });
    return <ul>{games}</ul>;
  }
}

export default App;
