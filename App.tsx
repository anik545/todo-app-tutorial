import { InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import css from './style.module.scss';

export const App: React.FC<{}> = () => {
  return (
    <div className={css.container}>
      <h1>Hello World</h1>
    </div>
  );
};
