import React from 'react';
import Comment from './Comment';

const Comments = ({commentList}) => {
  const renderComments = (commentList) => {
    if(commentList){
      return commentList.map( (comment, index) => 
        <Comment key={index} comment={comment}/>
      )
    }
  }

  return (
    <div className="Comments">
      <div className="Header">
        Comments
        </div>
      {renderComments(commentList)}
    </div>
  );
}

export default Comments;
