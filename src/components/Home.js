var React = require('react');
var Link = require('react-router-dom').Link;
var Nav = require('./Nav');

class Home extends React.Component {
  render () {
    return (
      <div className='home-container'>
      <Nav />
        <h1>Github Battle "Battle your friends"</h1>
          <Link className='button' to='/battle'>
          Battle
          </Link>
      </div>
    )
  }
}

module.exports = Home;
