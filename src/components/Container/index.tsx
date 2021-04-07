import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

interface IContainer {
  children: React.ReactNode;
}

const Container: React.FC<IContainer> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentBox}>
      <div className={classes.contentArea}>{children}</div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
