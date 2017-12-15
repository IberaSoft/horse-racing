import React from 'react';
import sortPlayers from '../sortPlayers';

export default class extends React.Component{

  render(){
    const position = sortPlayers(this.props.players).findIndex(p => p.horseNumber == this.props.horseNumber) + 1;

    if(position == 1){
        return <div>
          <section className="hero is-fullheight">

            <header className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">Congratulations !!</h1>
              </div>
            </header>

            <main className="hero-body">
              <div className="container has-text-centered">

                <div className="field">
                  <figure className="image is-square">
                    <img src={require('../../../styles/assets/prize1.svg')} alt="Image"/>
                  </figure>
                </div>

              </div>
            </main>

            <footer className="hero-body"></footer>

          </section>
        </div>;
    }

    if(position == 2){
      return <div>
        <section className="hero is-fullheight">

          <header className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Better luck next time</h1>
            </div>
          </header>

          <main className="hero-body">
            <div className="container has-text-centered">

              <div className="field">
                <figure className="image is-square">
                  <img src={require('../../../styles/assets/prize2.svg')} alt="Image"/>
                </figure>
              </div>

            </div>
          </main>

          <footer className="hero-body"></footer>

        </section>
      </div>;
    }

    if(position == 3){
        return <div>
            <section className="hero is-fullheight">

                <header className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Better luck next time</h1>
                    </div>
                </header>

                <main className="hero-body">
                    <div className="container has-text-centered">

                        <div className="field">
                            <figure className="image is-square">
                                <img src={require('../../../styles/assets/prize3.svg')} alt="Image"/>
                            </figure>
                        </div>

                    </div>
                </main>

                <footer className="hero-body"></footer>

            </section>
        </div>;
    }

      if(position == 4){
          return <div>
              <section className="hero is-fullheight">

                  <header className="hero-body">
                      <div className="container has-text-centered">
                          <h1 className="title">Better luck next time</h1>
                      </div>
                  </header>

                  <main className="hero-body">
                      <div className="container has-text-centered">

                          <div className="field">
                              <figure className="image is-square">
                                  <img src={require('../../../styles/assets/prize4.svg')} alt="Image"/>
                              </figure>
                          </div>

                      </div>
                  </main>

                  <footer className="hero-body"></footer>

              </section>
          </div>;
      }

    return <div>
      <section className="hero is-fullheight">

        <header className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Better luck next time</h1>
          </div>
        </header>

        <main className="hero-body">
          <div className="container has-text-centered">

            <div className="field">
              <figure className="image is-square">
                <img src={require('../../../styles/assets/prize5.svg')} alt="Image"/>
              </figure>
            </div>

          </div>
        </main>

        <footer className="hero-body"></footer>

      </section>
    </div>;
  }

};
