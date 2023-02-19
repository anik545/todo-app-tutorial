import { Button, Icon, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import css from './style.module.scss';

interface Todo {
  id: string;
  title: string;
}

export const App: React.FC<{}> = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const onDelete = (id: string) => {
    const newTodos = todos.filter((x) => x.id !== id);
    setTodos(newTodos);
  };
  return (
    <div className={css.container}>
      <h1>TODO App</h1>
    </div>
  );
};
