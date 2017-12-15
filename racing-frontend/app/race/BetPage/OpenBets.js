import React from 'react';

export default class extends React.Component{

  render(){
    const total = this.props.wallet.bets.map(b => b.amount).reduce(((l,r) => l + r), 0);

    return <div>
        <main className="hero-body">

            <div className="container has-text-centered">
                <table className="table is-narrow is-fullwidth">
                    <thead>
                    <tr>
                        <th>Selection</th>
                        <th>Odds</th>
                        <th>Stake</th>
                    </tr>
                    </thead>
                    <tbody>

                      { this.props.wallet.bets.map(bet => {
                        return <tr key={bet.horseNumber}>
                          <td>{bet.name}</td>
                          <td>{bet.fractionalOdds}</td>
                          <td>{bet.amount}</td>
                        </tr>;
                      }) }

                    </tbody>
                </table>
            </div>

        </main>
    </div>;

    return <div>
      Total bets: {total}

      { this.props.wallet.bets.map(bet => {
        return <div key={bet.horseNumber}>
          {bet.horseNumber} {bet.name} - {bet.fractionalOdds} - {bet.amount}
        </div>;
      }) }
    </div>;
  }

};
