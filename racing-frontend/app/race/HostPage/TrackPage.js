import React from 'react';
import QRCode from 'qrcode.react';
import PlayerList from '../PlayerList';
import CountdownOverlay from '../CountdownOverlay';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      show: true
    };

    this.groups = [];
    this.tracks = [];

  }

  start(){
  	this.props.socket.emit('start');
  	this.setState({show:false})
  }

  updateHorses(){

    const s = Snap("#track");

    const paths = [
      'M200.7 321.5c-66.3 0-120.2-54.1-120.2-120.5S134.4 80.5 200.7 80.5h220.5c66.3 0 120.2 54.1 120.2 120.5s-53.9 120.5-120.2 120.5H200.7z',
      'M200.7 341.5c-77.3 0-140.2-63-140.2-140.5S123.4 60.5 200.7 60.5h220.5c77.3 0 140.2 63 140.2 140.5s-62.9 140.5-140.2 140.5H200.7z',
      'M200.7 361.5c-88.4 0-160.2-72-160.2-160.5S112.4 40.5 200.7 40.5h220.5c88.4 0 160.2 72 160.2 160.5s-71.9 160.5-160.2 160.5H200.7z',
      'M200.7 381.5c-99.4 0-180.2-81-180.2-180.5S101.4 20.5 200.7 20.5h220.5c99.4 0 180.2 81 180.2 180.5s-80.9 180.5-180.2 180.5H200.7z',
      'M200.7 401.5C90.3 401.5.5 311.6.5 201S90.3.5 200.7.5h220.5C531.6.5 621.4 90.4 621.4 201s-89.8 200.5-200.2 200.5H200.7z'
    ];

    // const images = [
    //   require('../../../styles/assets/horses/h1a.png'),
    //   require('../../../styles/assets/horses/h2a.png'),
    //   require('../../../styles/assets/horses/h3a.png'),
    //   require('../../../styles/assets/horses/h4a.png'),
    //   require('../../../styles/assets/horses/h5a.png')
    // ];

    const images = [
      require('../../../styles/assets/horses/h1.gif'),
      require('../../../styles/assets/horses/h2.gif'),
      require('../../../styles/assets/horses/h3.gif'),
      require('../../../styles/assets/horses/h4.gif'),
      require('../../../styles/assets/horses/h5.gif')
    ];


    const coordinates = [
      [0, 0, 80, 15],
      [0, 0, 80, 15],
      [0, 0, 80, 15],
      [0, 0, 80, 15],
      [0, 0, 80, 15]
    ];

    const players = this.props.players;

    for(let i = 0; i < players.length;i++){
      const group = this.groups[i] = this.groups[i] || s.group(
        s.paper.image(images[i], ...coordinates[i])
      );

      const track = this.tracks[i] = this.tracks[i] || s.path(paths[i]).attr({
        id: 'tr' + (i + 1),
        stroke: '',
        strokeWidth: 1,
        fill: 'none'
      });

      const length = track.getTotalLength();
      const position = Math.min(0.99, 1 - players[i].progress) * length;
      const point = track.getPointAtLength(position);

      group.transform(
        't' + parseInt(point.x - 40) + ',' +
        parseInt( point.y - 10) + 'r' + point.alpha
      );
    }

  }

  render(){

    setTimeout(() => this.updateHorses(), 10);

    return <div>

      <CountdownOverlay
        countdown={this.props.countdown}
      />

      <section className="hero is-fullheight">
        <header className="hero-body">
          <div className="container">
            <h1 className="title"><strong>Race</strong> track</h1>
          </div>
        </header>

        <section className="container">
          <div className="columns">

            <div className="column is-9">
              <div className="content">

                <div className="track">
                  <svg id="track" width="100%" height="100%" viewBox="-15 -25 650 440" preserveAspectRatio="xMidYMax meet"></svg>
                </div>

                { this.props.countdown == null ? <div className="control">
                  <button onClick={() => this.start()} className="button is-primary is-outlined" type="submit" value="StartRace">Start Race</button>
                </div> : null }

              </div>
            </div>

            <div className="column is-3">
              <PlayerList players={this.props.players}/>

              <div className="tile is-parent">
                <article className="tile is-child notification is-info">
                  <p className="title has-text-centered">You can bet!!</p>
                  <p className="subtitle has-text-centered">Scan the code below</p>
                  <figure className="image has-text-centered">
                    <QRCode value={ `${location.origin}/#/${this.props.page.betPage}` }/>
                  </figure>
                </article>
              </div>

            </div>

          </div>
        </section>

        <footer className="hero-body"></footer>
      </section>


    </div>;
  }

};
