import React from "react";

export default class CellObject extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);

    // each cell will hold it`s state as a boolean value
    // False = dead, True = alive
    this.state = { currentState: false };
  }

  handleClick() {
    this.setState({ currentState: !this.state.currentState });
  }

  handleStateChange() {
    this.setState({ currentState: !this.state.currentState });
  }

  render() {
    return <div>{this.state.currentState ? <p>true</p> : <p>false</p>}</div>;
  }
}
