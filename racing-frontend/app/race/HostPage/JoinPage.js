import React from 'react';
import QRCode from 'qrcode.react';

import PlayerList from '../PlayerList';

export default class extends React.Component {

  render() {

    return <div>

      <section className="hero is-fullheight">
          <header className="hero-body">
              <div className="container has-text-centered">
                  <h1 className="title"><strong>Join</strong> the race</h1>
              </div>
          </header>

          <section className="container">
              <div className="columns">

                  <div className="column is-7">
                      <div className="content">
                          <div className="columns">
                              <div className="column">
                                  <PlayerList players={this.props.players}/>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="column is-5">
                      <div className="content">
                          <div className="tile is-parent">
                              <article className="tile is-child notification is-info">
                                  <p className="subtitle has-text-centered">Please scan the QR Code</p>
                                  <figure className="image has-text-centered">
                                      <QRCode value={ `${location.origin}/#/${this.props.page.playerPage}` }/>
                                  </figure>
                              </article>
                          </div>

                          <div className="field">
                              <div className="control">
                                  <button onClick={() => this.props.onReady()} class="button is-primary is-outlined" type="submit" value="Join">Join the Race</button>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
        </section>

        <footer className="hero-body"></footer>

      </section>
    </div>;
  }
};
