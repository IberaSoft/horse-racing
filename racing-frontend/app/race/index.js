import React from 'react';
import io from 'socket.io-client';

import Host from './HostPage';
import PlayerPage from './PlayerPage';
import BetPage from './BetPage';

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      players: [],
      countdown: null,
      joiningRace: true,
      page: {},
      socket: io(process.env.BACKEND_URL)
    };

  }

  componentDidMount() {

    this.state.socket.on('page', (page) => {
      this.setState({ page });
    });

    this.state.socket.on('playerList', (players) => {
      this.setState({ players });
    });

    this.state.socket.on('countdown', ({countdown}) => {
      this.setState({ countdown });
    });

    this.state.socket.on('appError', (data) => {
      console.error(data);
    });

    this.state.socket.emit('renderPage', {page: this.props.match.params.pageCode});

  }

  componentWillUnmount(){
  	this.state.socket.close();
  }

  render(){

  	switch(this.state.page.type){

  		case 'hostPage':
  			return <Host
  				socket={this.state.socket}
  				players={this.state.players}
  				countdown={this.state.countdown}
  				page={this.state.page}
  			/>;

  		case 'playerPage':
  			return <PlayerPage
          socket={this.state.socket}
          players={this.state.players}
          countdown={this.state.countdown}
        />;

  		case 'betPage':
        return <BetPage
          socket={this.state.socket}
          players={this.state.players}
        />;

  	}

  	return null;
  }

};
