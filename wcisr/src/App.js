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
    var speedrun_games = _.map(this.state.speedrun_games, '[1]')
    var intersected_games = _.intersection(this.state.games, speedrun_games);
    var total = intersected_games.length;
    var profileOverview;
    var intersected_games_list = _.map(intersected_games, (intersected_game) => {
      return <a className="list-group-item" ref="game_name" style={{width: "100%", height: "auto", display: "block", padding: "10px 15px"}} onClick={() => this.getGameInfoByName(intersected_game)}>{intersected_game}</a>;
    })
    var game = _.map(this.state.game, (game_detail) => {
      return <div>
          <div className="thumbnail">
            <img role="presentation" src={game_detail.assets['cover-large'].uri} />
            <div className="caption">
              <h3>{game_detail['names']['international']}</h3>
              <p>Release: {game_detail['release-date']}</p>
              <p><a href={game_detail.weblink} target="_blank" className="btn btn-primary" role="button">view on Speedrun.com</a></p>
            </div>
          </div>
      </div>;
    });

    if(this.state.total === 0) {
      profileOverview = (
        <h4>Profile private or not existing.</h4>
      )
    } else {
      profileOverview = (
        <div>
          <h4>Intersect: {total} Games</h4> 
          <div className="list-group">
            {intersected_games_list}
          </div>
        </div>
      )
    }

    return <section>
              <div className="row">
                <div className="col-xs-6">
                  <h4>Steam Community Id</h4>
                  <form>
                    <input ref="steam_community_id" onChange={ (e) => { this.updateSearch(); } } type="text" className="form-control" placeholder="Steam Community id. Grab this at steamid.eu" />
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6">{ profileOverview }</div>
                <div className="col-xs-6" style={{position: 'fixed', right: '20px', top: '70px'}}>
                  <h4>Game Details</h4>
                  <ul>{ game }</ul>
                </div>
              </div>
            </section>;

  }

  getGameInfoByName(game_name) {
    var url = `http://127.0.0.1:8080/speedrun/game/${game_name}`;
    Request.get(url).then((response) => {
      this.setState({
        game: response.body
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
