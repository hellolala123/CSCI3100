import React from 'react';
import TweetList from './TweetList';
import Navigation from './Navigation'; // Assuming Navigation is another component 

const Homepage = () => {
  return (
    <div>
      <TweetList />
      <Navigation />
    </div>
  );
};

export default Homepage;
