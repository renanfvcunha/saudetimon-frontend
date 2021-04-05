import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

interface IBox {
  scrollable?: boolean;
  children: React.ReactNode;
}

const DefaultBox: React.FC<IBox> = ({ scrollable, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentBox}>
      <div
        className={classes.contentArea}
        style={scrollable ? { maxHeight: '100%', overflow: 'auto' } : {}}
      >
        {children}
      </div>
    </div>
  );
};

DefaultBox.propTypes = {
  scrollable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

DefaultBox.defaultProps = {
  scrollable: false,
};

export default DefaultBox;
