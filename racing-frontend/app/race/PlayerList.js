import React from 'react';
import sortPlayers from './sortPlayers';

const avatars = [
  require('../../styles/assets/avatars/avatar1.svg'),
  require('../../styles/assets/avatars/avatar2.svg'),
  require('../../styles/assets/avatars/avatar3.svg'),
  require('../../styles/assets/avatars/avatar4.svg'),
  require('../../styles/assets/avatars/avatar5.svg')
];

export default class extends React.Component{

  render(){
    return <div>
      { sortPlayers(this.props.players).map(player =>

        <div key={player.horseNumber} className="box">
          <article className="media">
            <div className="media-left">
              <figure>
                <img className="image is-64x64" src={avatars[player.horseNumber - 1]} alt="Image"/>
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                    <span className="is-pulled-left">{player.name}</span>
                    <span className="is-pulled-right is-info">Horse {player.horseNumber}</span>
                </p>
              </div>
            </div>
          </article>
        </div>

      ) }
    </div>;
  }

};
