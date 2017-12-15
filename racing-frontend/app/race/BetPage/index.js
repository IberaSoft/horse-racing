import React from 'react';

import EventPage from './EventPage';
import OpenBets from './OpenBets';

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      wallet: null,
      activeTab: 'race'
    };

  }

  componentDidMount(){

    this.props.socket.on('wallet', (wallet) => {
      localStorage.walletID = wallet.id;
      this.setState({ wallet });
    });

    if(localStorage.walletID){
      this.props.socket.emit('useWallet', {
        walletID: localStorage.walletID
      });
    }else{
      this.props.socket.emit('createWallet');
    }

  }

  showTab(tab){
    this.setState({
      activeTab: tab
    });
  }

  render(){

    if(!this.state.wallet) return null;

    let content;

    if(this.state.activeTab == 'race'){
      content = <EventPage
        players={this.props.players}
        socket={this.props.socket}
        wallet={this.state.wallet}
      />;
    }else{
      content = <OpenBets wallet={this.state.wallet}/>;
    }

    return <div>
      <section className="hero is-fullheight">

        <header className="hero-body betting-header">
          <div className="tabs is-large is-fullwidth">
            <ul>
              <li className={this.state.activeTab == 'race' ? 'is-active' : ''} onClick={() => this.showTab('race')}><a>Race</a></li>
              <li className={this.state.activeTab == 'bets' ? 'is-active' : ''} onClick={() => this.showTab('bets')}><a>Open bets</a></li>
            </ul>
          </div>
        </header>

        <div className="container has-text-centered">
          <h6>Your balance is</h6>
          <h1 className="title balance">£{this.state.wallet.balance}</h1>
        </div>

        { content }

      </section>
    </div>;
  }

};
