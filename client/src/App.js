import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      Host: 'http://localhost:8080',
      Links: [{ longUri: '', shortUri: '' }],
    };
  }
  handleAddLink = () => {
    this.setState({
      Links: this.state.Links.concat([{ longUri: '', shortUri: '' }]),
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
    axios(this.state.Host, {
      method: 'POST',
      mode: 'cors',
      data: {
        longUri: Links.map(Link => Link.longUri),
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.data)
      .then(data => {
        this.setState({ Host: data.Host, Links: data.Links });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the MERN Link Shortener</h1>
          <h4>
            Current API is: <i>{this.state.Host}</i>
          </h4>
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

              {Link.shortUri !== '' && (
                <a target="_blank" href={`${this.state.Host}${Link.shortUri}`}>
                  {`${this.state.Host}${Link.shortUri}`}
                </a>
              )}
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
