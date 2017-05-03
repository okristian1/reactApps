var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function OuterNav() {
  return (
    <ul className='outer-nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Main
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Leaderboard'>
          Leaderboard
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Tutorial'>
          Tutorial
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = OuterNav;
