import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './Tweet'; // Component representing an individual tweet

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('/api/messages/following'); // Adjust the endpoint as needed
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      {tweets.map(tweet => (
        <Tweet key={tweet._id} content={tweet.content} /* other tweet props */ />
      ))}
    </div>
  );
};

export default TweetList;
