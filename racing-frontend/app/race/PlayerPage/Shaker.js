import React from 'react';
import sortPlayers from '../sortPlayers';
import _ from 'lodash';

const MIN_PROGRESS = 1;

export default class extends React.Component{

  componentDidMount(){
    let prev;

    this.listener = _.throttle(e => {
      if(!prev) prev = e.acceleration;

      const d = {
        x: prev.x - e.acceleration.x,
        y: prev.y - e.acceleration.y,
        z: prev.z - e.acceleration.z
      };

      prev = e.acceleration;

      const modulus = Math.sqrt(d.x ** 2 + d.y ** 2 + d.z ** 2);

      if(modulus > MIN_PROGRESS) this.props.socket.emit('progress', {
        progress: modulus
      });
    }, 100);

    window.addEventListener('devicemotion', this.listener, true);
  }

  componentWillUnmount(){
    window.removeEventListener('devicemotion', this.listener, true);
  }

  render(){
    const position = sortPlayers(this.props.players).findIndex(p => p.horseNumber == this.props.horseNumber) + 1;

    return <div>
      <section className="hero is-fullheight">

        <header className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title"><strong>Shake</strong> your phone</h1>
          </div>
        </header>

        <main className="hero-body">
          <div className="container has-text-centered">

            <div className="field">
              <figure className="image is-square">
                <img src={require('../../../styles/assets/shake.svg')} alt="Image"/>
              </figure>
            </div>

          </div>
        </main>

        <footer className="hero-body"></footer>

      </section>
    </div>;
  }

};
