import React, { Component } from 'react';
import Comments from './Comments'

class CommentSection extends Component {
  constructor(props) {
    super(props);
    const comments = [
      {
        author: "Kurt Vonnegut", 
        body: "I urge you to please notice when you are happy, and exclaim or murmur or think at some point, 'If this isn’t nice, I don’t know what is.'"
      }, 
      {
        author: "Tom Robbins", 
        body: "You should never hesitate to trade your cow for a handful of magic beans."
      }
    ];
    this.state = { 
      comments: comments
    };
  }
  render() {
    return (
      <div className="CommentSection">
        <Comments comments={this.state.comments} />
        <button>Add Comment</button>
      </div>
    )
  }
}

export default CommentSection

