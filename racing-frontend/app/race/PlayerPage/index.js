import React from 'react';

import NamePrompt from './NamePrompt';
import WaitingRoom from './WaitingRoom';
import Shaker from './Shaker';
import Result from './Result';
import Countdown from './Countdown';
import RaceFull from './RaceFull';

export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const socket = this.props.socket;

    socket.on('player', (player) => {
      this.setState({ player });
    });

  }

  render(){
    const player = this.state.player;
    const countdown = this.props.countdown;

    if(!player){
      return <NamePrompt
        socket={this.props.socket}
      />;
    }

    if(player.horseNumber > 5){
      return <RaceFull/>;
    }

    if(countdown == null){
      return <WaitingRoom
        players={this.props.players}
      />;
    }

    if(countdown > 0){
      return <Countdown
        countdown={countdown}
      />;
    }

    const progress = this.props.players[player.horseNumber - 1].progress;

    if(progress < 1){
      return <Shaker
        socket={this.props.socket}
        players={this.props.players}
        horseNumber={player.horseNumber}
      />;
    }

    return <Result
      players={this.props.players}
      horseNumber={player.horseNumber}
    />;
  }

};
