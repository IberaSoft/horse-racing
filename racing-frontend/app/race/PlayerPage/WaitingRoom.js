import React from 'react';
import PlayerList from '../PlayerList';

export default class extends React.Component{

  render(){

    return <div>
      <section className="hero is-fullheight">
        <header className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Players</h1>
          </div>
        </header>

        <main className="hero-body">
          <div className="container has-text-centered">
            <PlayerList
              players={this.props.players}
            />
          </div>
        </main>

          <footer className="hero-body"></footer>
      </section>
    </div>;
  }

};
