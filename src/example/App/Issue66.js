import React from 'react';
import Collapse from '../..';


const Test = React.createClass({
  propTypes: {
    onMount: React.PropTypes.func.isRequired,
    onUnmount: React.PropTypes.func.isRequired
  },


  componentDidMount() {
    this.props.onMount();
  },


  componentWillUnmount() {
    this.props.onUnmount();
  },


  render() {
    return <div>Test</div>;
  }
});


export const Issue66 = React.createClass({
  propTypes: {
    isOpened: React.PropTypes.bool.isRequired
  },


  getInitialState() {
    return {shouldRender: false};
  },


  componentWillMount() {
    this.counter = 0;
    this.messages = [];
  },


  onRef(ref) {
    this.ref = ref;
  },


  onMount() {
    if (this.ref) {
      this.messages.unshift(`${this.counter}. Mounted`);
      this.messages = this.messages.slice(0, 5);
      this.ref.innerHTML = this.messages.join('<br />');
      this.counter = this.counter + 1;
    }
  },


  onUnmount() {
    if (this.ref) {
      this.messages.unshift(`${this.counter}. Unmounted`);
      this.messages = this.messages.slice(0, 5);
      this.ref.innerHTML = this.messages.join('<br />');
      this.counter = this.counter + 1;
    }
  },


  onChange({target: {checked}}) {
    this.setState({shouldRender: checked});
  },


  render() {
    return (
      <div>
        <div className="config">
          <label className="label">
            Should render:
            <input
              type="checkbox"
              checked={this.state.shouldRender}
              onChange={this.onChange} />
          </label>
        </div>

        <div className="config" ref={this.onRef} />

        {this.state.shouldRender ? (
          <Collapse isOpened={this.props.isOpened}>
            <Test onMount={this.onMount} onUnmount={this.onUnmount} />
          </Collapse>
        ) : null}
      </div>
    );
  }
});
