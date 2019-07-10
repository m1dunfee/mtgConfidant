import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        My name is Dylan and I'm a 29 year old from Minneapolis, Minnesota. I've been Play Magic for about the 
        last 15 years and during that time I've become fully immersed in the Twin Cities community and 
        accumulated quite the collection. I've decided that now it's tome to sell some of it and that's
        what this website is for!
      </p>
    </div>
  </div>
);

export default AboutPage;
