var React = require('react');
var PropTypes = require('prop-types');

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      speed: 300
    };
  }
  componentDidMount () {
    var stopper=this.props.text + '...';
    this.interval=window.setInterval(function() {
      if(this.state.text === stopper) {
        this.setState(function() {
          return {
            text: this.props.text
          }
        });
      } else {
        this.setState(function(prevState) {
          return {
            text: prevState.text + '.'
          }
        });
      }
    }.bind(this), this.props.speed)
  }
  componentWillUnmount () {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p className='Loader'>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};

module.exports = Loading;
