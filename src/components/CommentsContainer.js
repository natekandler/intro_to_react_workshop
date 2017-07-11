import React, { Component } from 'react';
import Comments from './Comments'
import Form from './Form'

class CommentsContainer extends Component {
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
      showForm: false,
      comments: comments
    };
  }

  showCommentForm(e) {
    e.preventDefault();
    this.setState({ showForm: true })
  } 

  getFormValues(form) {
    var kvpairs = {};
    for ( var i = 0; i < form.elements.length; i++ ) {
      var e = form.elements[i];
      if(e.name){
        kvpairs[e.name] = e.value;
      }
    }
    return kvpairs;
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let newComment = this.getFormValues(event.target)
    let list = [...this.state.comments, newComment]
    this.setState({ 
      showForm: false,
      comments: list
    })
  }

  hideCommentForm(e) {
    e.preventDefault();
    this.setState({ showForm: false })
  }

  renderForm() {
    if(this.state.showForm){
      return <Form handleFormSubmit={this.handleFormSubmit.bind(this)} hideCommentForm={this.hideCommentForm.bind(this)} />
    } else {
      return <button onClick={this.showCommentForm.bind(this)}>Add Comment</button>
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

