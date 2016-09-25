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

  getGameInfo() {
    this.getGameInfoByName(this.refs.game_name.value)
  }

  render() {
    var speedrun_games = _.map(this.state.speedrun_games, '[1]')
    var intersected_games = _.intersection(this.state.games, speedrun_games);

    var intersected_games_list = _.map(intersected_games, (intersected_game) => {
      return <li><a ref="game_name" onChange={(e) => {this.getGameInfo();}}>{intersected_game}</a></li>;
    })

    let total = intersected_games.length;
    let profileOverview;

    if(this.state.total === 0) {
      profileOverview = (
        <h4>Profile private or not existing.</h4>
      )
    } else {
      profileOverview = (
        <div>
        <h4>Total matches between steam and speedrun.com: {total}</h4> 
        <ul>{intersected_games_list}</ul>
        </div>
      )
    }


    return  <div>
            <input ref="steam_community_id" onChange={ (e) => { this.updateSearch(); } } type="text" />
            { profileOverview }
            </div>;

  }

  getGameInfoByName(game_name) {
    var url = `http://127.0.0.1:8080/speedrun/game/${game_name}`;
    Request.get(url).then((response) => {
      this.setState({
        game_name: response.body
      })
    });
  }

  search(steam_community_id=76561197962375306) {
    var url = `http://127.0.0.1:8080/steam-game-library/${steam_community_id}`;
    Request.get(url).then((response) => {
      this.setState({
        games: response.body
      })
    });

    var speedrun_url = `http://127.0.0.1:8080/speedrun/all`;
    Request.get(speedrun_url).then((response) => {
      this.setState({
        speedrun_games: response.body
      })
    });
  }
}

export default App;
