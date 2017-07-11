import React, { Component } from 'react';
import Comments from './Comments'
import Form from './Form'

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    const comments = [
      {
        author: "Kurt Vonnegut", 
        body: "You should never hesitate to trade your cow for a handful of magic beans."
      }, 
      {
        author: "Tom Robbins", 
        body: "You should never hesitate to trade your cow for a handful of magic beans."
      }
    ];
    this.state = { 
      showForm: false,
      comments: comments
    };
  }

   renderForm() {
    if(this.state.showForm){
      return <Form />
    } else {
      return <button>Add Comment</button>
    }
  } 

  render() {
    return (
      <div className="CommentsContainer">
        <Comments comments={this.state.comments} />
        {this.renderForm()}
      </div>
    )
  }
}

export default CommentsContainer

