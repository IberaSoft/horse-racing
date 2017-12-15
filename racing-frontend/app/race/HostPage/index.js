import React from 'react';

import JoinPage from './JoinPage';
import TrackPage from './TrackPage';

export default class extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      joining: true
    };
  }

  render() {

  	let page = null;
    if (this.state.joining) {

      page = <JoinPage
      	players={this.props.players}
      	countdown={this.props.countdown}
      	page={this.props.page}
      	onReady={() => this.setState({joining: false})}
      />;

    } else {
      page = <TrackPage
        players={this.props.players}
      	countdown={this.props.countdown}
      	page={this.props.page}
      	socket={this.props.socket}
      />;
    }

    return page;
  }

};
