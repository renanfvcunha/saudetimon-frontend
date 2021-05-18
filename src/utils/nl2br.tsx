import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

export default function nl2br(text: string): JSX.Element[] {
  const textSplitted = text.split('\n');

  const newText = textSplitted.map((txt, i) => {
    if (txt !== '') {
      if (i + 1 === textSplitted.length) {
        return (
          <Fragment key={Math.random()}>
            <Typography component="span">{txt}</Typography>
          </Fragment>
        );
      }

      return (
        <Fragment key={Math.random()}>
          <Typography component="span">{txt}</Typography>
          <br />
        </Fragment>
      );
    }

    return (
      <Fragment key={Math.random()}>
        <br />
      </Fragment>
    );
  });

  return newText;
}
