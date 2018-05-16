import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      Links: [{ longUri: '' }],
    };
  }
  handleAddLink = () => {
    this.setState({
      Links: this.state.Links.concat([{ longUri: '' }]),
    });
  };
  handleLongUriChange = idx => evt => {
    const newLinks = this.state.Links.map((Link, lidx) => {
      if (idx !== lidx) return Link;
      return { ...Link, longUri: evt.target.value };
    });

    this.setState({ Links: newLinks });
  };

  handleLongUriRemove = idx => () => {
    this.setState({
      Links: this.state.Links.filter((l, lidx) => idx !== lidx),
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { Links } = this.state;
    console.dir(Links);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <h4>Links</h4>

          {this.state.Links.map((Link, idx) => (
            <div className="Links" key={idx}>
              <input
                type="text"
                placeholder={`Link #${idx + 1} LongUri`}
                value={Link.longUri}
                onChange={this.handleLongUriChange(idx)}
              />
              <button
                type="button"
                onClick={this.handleLongUriRemove(idx)}
                className="small"
              >
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddLink} className="small">
            Add Link
          </button>
          <button>Shorten</button>
        </form>
      </div>
    );
  }
}

export default App;
