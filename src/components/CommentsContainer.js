import React, { Component } from 'react';
import Comments from './Comments'
import Form from './Form'

class CommentSection extends Component {
  constructor(props) {
    super(props);
    const commentList = [
      {
        author: "Kurt Vonnegut", 
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
      }, 
      {
        author: "Tom Robbins", 
        body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }
    ];
    this.state = { 
      showForm: false,
      commentList: commentList
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
    newComment.author = newComment.author ? newComment.author : "anonymous"
    if(newComment.body){
      let list = [...this.state.commentList, newComment]
      this.setState({ 
        showForm: false,
        commentList: list
      })
    }
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
      <div className="CommentSection">
        <Comments commentList={this.state.commentList} />
        {this.renderForm()}
      </div>
    )
  }
}

export default CommentSection

