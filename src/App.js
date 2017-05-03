import './Tutorial.css';
import './Leaderboard.css';
var React = require('react');
var Popular = require('./components/Popular.js');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Main = require('./components/Main');
var Home = require('./components/Home');
var Battle = require('./components/Battle');
var Results = require('./components/Results');
var OuterNav = require('./components/OuterNav');
var Leaderboard = require('./components/Leaderboard');
var Switch = ReactRouter.Switch;
var Route = ReactRouter.Route;


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
        <OuterNav />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/tutorial' component={Home} />
            <Route path='/popular' component={Popular} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route exact path='/leaderboard' component={Leaderboard} />
            <Route render={function() {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
