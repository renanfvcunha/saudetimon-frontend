import React from 'react';

import useStyles from './styles';

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>Home Page!</h1>
    </main>
  );
};

export default Home;
