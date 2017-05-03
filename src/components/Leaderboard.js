import React, { Component } from 'react';
import axios from 'axios';
var Loading = require('./Loading');


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      campers: false,
      list: []
    };
  }


updateCampers(campers) {
  console.log("running");
  let list;
  let temp = [];
  let id;
  if(campers)
    list='recent';
    else
    list='alltime';

  axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/'+list)
    .then(result=> {
      result.data.forEach((camper) => {
        temp.unshift(camper);
      });
      id = temp.length;
      temp.map(camper => {
        camper['id']=id;
        id--;
        return null;
      });
      this.setState({ list: temp.reverse()})
      this.setState(function() {
        return {
          loading: false
        }
      });
    })
  }

componentDidMount() {
  this.updateCampers(this.state.campers);
}

handleClick = () => {
  this.setState(prevState => ({
      campers: !prevState.campers
    }), () => this.updateCampers(this.state.campers));
  }



  render() {
    var loading = this.state.loading;
    if(loading) {
      return(
        <Loading />
      )
    }
    return (
      <div className="column-leaderboard">
      <button className="toggle" onClick={this.handleClick}>
         {this.state.campers ? 'Most Points Last 30 days' : 'Most Points All Time'}
      </button>
        <table>
        <tbody>
        <tr>
        <th>#</th>
        <th>User</th>
        <th>Last 30 days</th>
        <th>All Time</th>
        </tr>
          {this.state.list.map(camper =>
            <tr key={camper.username}>
            <td className="id">{camper.id}</td>
            <td className="user">
              <a href={"https://www.freecodecamp.com/"+camper.username}>
                <img
                className="avatar"
                src={camper.img}
                alt={'Avatar for '+camper.username}
                href={"https://www.freecodecamp.com/"+camper.username}
                /> </a>
                <a href={"https://www.freecodecamp.com/"+camper.username}>{camper.username}</a>
              </td>
            <td className="score">{camper.recent}</td>
            <td className="score">{camper.alltime}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = Leaderboard;
