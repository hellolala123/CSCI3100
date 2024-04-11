import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweetlist from './TweetList'; // Component representing an individual tweet

const UserTweets = ({ userId }) => {
  const [userTweets, setUserTweets] = useState([]);

  useEffect(() => {
    const fetchUserTweets = async () => {
      try {
        const response = await axios.get(`/api/messages/user/${userId}`); // Adjust the endpoint as needed
        setUserTweets(response.data);
      } catch (error) {
        console.error('Error fetching user tweets', error);
      }
    };

    if (userId) {
      fetchUserTweets();
    }
  }, [userId]);

  return (
    <div>
      {userTweets.map(tweet => (
        <Tweet key={tweet._id} content={tweet.content} /* other tweet props */ />
      ))}
    </div>
  );
};

export default UserTweets;
