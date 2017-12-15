import React from 'react';
import Slider from 'react-rangeslider';
import io from 'socket.io-client';

class LandingPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount(){
  	this.socket = io(process.env.BACKEND_URL);

  	this.socket.on('raceCreated', ({hostPage}) => {
  		location.href = location.origin + '/#/' + hostPage;
  	});

  }

  componentWillUnmount(){
  	this.socket.close();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  	this.socket.emit('createRace', {target: parseFloat(this.state.value)});
    event.preventDefault();
  }

  render () {
    const { value } = this.state;
    return  <section className="hero is-fullheight">
                <header className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Create a <strong>Race</strong></h1>
                    </div>
                </header>

                <main className="hero-body">
                    <div className="container has-text-centered">
                        <div className="field create-race">
                            <label>Duration of the race:</label>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-rounded" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder="Enter Race Duration" />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <button className="button is-primary is-outlined" type="submit" value="Create">Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>

                <footer className="hero-body"></footer>
        </section>;
  }
};

export default LandingPage;
