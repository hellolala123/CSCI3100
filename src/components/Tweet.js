import React from 'react';

const Tweet = ({ content, author, likes, retweets, onLike, onRetweet }) => {
  // You can add functions to handle like and retweet actions if needed
  // These functions would call onLike and onRetweet passed as props
  
  return (
    <div className="tweet">
      <h3>{author}</h3>
      <p>{content}</p>
      <div className="actions">
        <button onClick={onLike}>Like ({likes})</button>
        <button onClick={onRetweet}>Retweet ({retweets})</button>
        {/* Add more actions as necessary */}
      </div>
    </div>
  );
};



export default Tweet;
