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
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  const addNewTodo = () => {
    const newTodo = { id: uuid(), title: newTodoTitle };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className={css.container}>
      <InputGroup
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <Button onClick={addNewTodo} text="Add todo" icon="add" />
      {todos.map((x) => (
        <div>{x.title}</div>
      ))}
    </div>
  );
};
