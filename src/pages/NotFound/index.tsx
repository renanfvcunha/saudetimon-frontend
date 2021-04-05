import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './styles';
import DefaultBox from '../../components/DefaultBox';

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DefaultBox>
        <div className={classes.msgAlign}>
          <Typography component="h1" variant="h4">
            A página solicitada não foi encontrada.
          </Typography>
        </div>
      </DefaultBox>
    </main>
  );
};

export default NotFound;
