import { Button, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import css from './style.module.scss';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: number;
  title: string;
}

export const App: React.FC<{}> = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = React.useState('');
  return (
    <div className={css.container}>
      <InputGroup
        type="text"
        value={currentTodo}
        onChange={(e) => setCurrentTodo(e.target.value)}
      />
      <Button
        onClick={() => setTodos([...todos, { id: uuid(), title: currentTodo }])}
      >
        Add todo
      </Button>
      {todos.map((x) => (
        <div>{x.title}</div>
      ))}
    </div>
  );
};
