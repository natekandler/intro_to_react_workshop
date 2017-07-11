import React, { Component } from 'react';
import Comments from './Comments'

class CommentsContainer extends Component {

  render() {
    return (
      <div className="CommentsContainer">
        <Comments />
        <button>Add Comment</button>
      </div>
    )
  }
}

export default CommentsContainer

