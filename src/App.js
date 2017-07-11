import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="CommentsContainer">
          <div className="Comments">
            <div className="Header">
              Comments
            </div>
            <div className="Comment">
              <div className="Comment__body">
                 I urge you to please notice when you are happy, and exclaim or murmur or think at some point, 'If this isn’t nice, I don’t know what is.'
              </div>
              <div className="Comment__author">
                <span className="Comment__author-name">author</span>
                Kurt Vonnegut
              </div>
            </div>
            <div className="Comment">
              <div className="Comment__body">
                You should never hesitate to trade your cow for a handful of magic beans.
              </div>
              <div className="Comment__author">
                <span className="Comment__author-name">author</span>
                  Tom Robbins
              </div>
            </div>
          </div>
          <button>Add Comment</button>
        </div>
      </div>
    );
  }
}

export default App;
