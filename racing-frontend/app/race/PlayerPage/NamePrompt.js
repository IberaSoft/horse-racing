import React from 'react';

export default class extends React.Component{

  sendName(e){
    e.preventDefault();
    this.props.socket.emit('name', {
      name: this.refs.name.value
    });
  }

  render(){

    return <div>
      <section className="hero is-fullheight">
        <header className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Join <strong>the race</strong></h1>
          </div>
        </header>

        <main className="hero-body">
          <div className="container has-text-centered">

            <div className="field">
              <form onSubmit={e => this.sendName(e)}>
                <label>Enter Your Name:</label>
                <div className="control">
                    <input ref="name" className="input is-rounded" type="text" placeholder="What's your name?"/>
                </div>
              </form>
            </div>

          </div>
        </main>

        <footer className="hero-body">
          <div className="container has-text-centered">
            <div className="control">
              <button onClick={e => this.sendName(e)} className="button is-primary is-outlined" type="submit" value="Join">Join</button>
            </div>
          </div>
        </footer>

      </section>
    </div>;

    return <form onSubmit={e => this.sendName(e)}>
      <input ref="name"/>
      <button>
        OK
      </button>
    </form>;
  }

};
