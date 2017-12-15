import React from 'react';
import CountdownOverlay from '../CountdownOverlay';

export default class extends React.Component{

  render(){
    return <div>
      <section className="hero is-fullheight">
        <CountdownOverlay
          countdown={this.props.countdown}
        />
      </section>
    </div>;
  }

};
