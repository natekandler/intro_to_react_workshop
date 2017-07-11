import React from 'react';
import Comment from './Comment';

const Comments = ({comments}) => {
  const renderComments = (comments) => {
    if(comments){
      return comments.map( (comment, index) => 
        <Comment key={index} comment={comment}/>
      )
    }
  }

  return (
    <div className="Comments">
      <div className="Header">
        Comments
        </div>
      {renderComments(comments)}
    </div>
  );
}

export default Comments;
