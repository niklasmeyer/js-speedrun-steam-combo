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
  }

  updateSearch() {
    this.search(this.refs.steam_community_id.value)
  }

  render() {
    var games = _.map(this.state.games, (game) => {
      return <li>{game}</li>; 
    });
    var total = this.state.total;
    let profileOverview;

    if(this.state.total === 0) {
      profileOverview = (
        <h4>Profile private or not existing.</h4>
      )
    } else {
      profileOverview = (
        <div>
        <h4>Total Games: {total}</h4> 
        <ul>{games}</ul>
        </div>
      )
    }


    return  <div>
            <input ref="steam_community_id" onChange={ (e) => { this.updateSearch(); } } type="text" />
            { profileOverview }
            </div>;

  }

  search(steam_community_id=76561197962375306) {
    var url = `http://127.0.0.1:8080/steam-game-library/${steam_community_id}`;
    Request.get(url).then((response) => {
      this.setState({
        games: response.body,
        total: response.body.length
      })
    })

  }
}

export default App;
