import React from 'react';

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      phase: null
    };

  }

  render(){
    let containerClassName;

    if(this.props.countdown == null || this.state.phase == 'left'){
      return null;
    }

    if(this.state.phase == null){

      setTimeout(() => {
        this.setState({
          phase: 'entered'
        });
      }, 10);

      containerClassName = 'countdown-overlay countdown-overlay--hidden';

    }

    if(this.state.phase == 'entered'){
      containerClassName = 'countdown-overlay';
    }

    if(this.props.countdown == 0){

      setTimeout(() => {
        this.setState({
          phase: 'left'
        });
      }, 500);

      containerClassName = 'countdown-overlay countdown-overlay--hidden';

    }

    return <div className={containerClassName}>
      <div className={`countdown-item ${this.props.countdown == 3 ? 'countdown-item--showing' : ''} ${this.props.countdown < 3 ? 'countdown-item--shown' : ''} ${this.props.countdown == null ? 'countdown-item--hidden' : ''}`}>
        3
      </div>
      <div className={`countdown-item ${this.props.countdown == 2 ? 'countdown-item--showing' : ''} ${this.props.countdown < 2 ? 'countdown-item--shown' : ''} ${this.props.countdown > 2 ? 'countdown-item--hidden' : ''}`}>
        2
      </div>
      <div className={`countdown-item ${this.props.countdown == 1 ? 'countdown-item--showing' : ''} ${this.props.countdown < 1 ? 'countdown-item--shown' : ''} ${this.props.countdown > 1 ? 'countdown-item--hidden' : ''}`}>
        1
      </div>
      <div className={`countdown-item ${this.props.countdown == 0 ? 'countdown-item--showing' : ''} ${this.props.countdown < 0 ? 'countdown-item--shown' : ''} ${this.props.countdown > 0 ? 'countdown-item--hidden' : ''}`}>
        GO!!
      </div>
    </div>;

  }

};
