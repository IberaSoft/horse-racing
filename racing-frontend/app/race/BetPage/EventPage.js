import React from 'react';

export default class extends React.Component{

  render(){
    let winner = this.props.players.find(p => p.progress == 1);

    if(!winner){

      return <div>


        <main className="hero-body">
            <div className="container has-text-centered">
                <div className="field">
                    <div className="control">
                        <input ref="bet" className="input is-rounded" type="text" placeholder="Enter the amount"/>
                    </div>
                </div>
            </div>
        </main>


        <footer className="hero-body">

            <div className="container has-text-centered">
                <table className="table is-narrow is-fullwidth">
                    <tbody>

                      {this.props.players.map((player, i) => {

                        const onClick = () => {
                          this.props.socket.emit('bet', {
                            amount: parseFloat(this.refs.bet.value),
                            horseNumber: player.horseNumber
                          });
                        };

                        return <tr key={player.horseNumber}>
                          <td>{player.name}</td>
                          <td><a onClick={onClick} className={`button ${i % 2 ? 'is-primary is-outlined' : 'is-info'}`}>
                            {player.fractionalOdds}
                          </a></td>
                        </tr>;
                      })}

                    </tbody>
                </table>
            </div>

        </footer>
      </div>;
    }

    return <div>
      {winner.name} won the race!
    </div>;
  }

};
