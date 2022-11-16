import { Button, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import css from './style.module.scss';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export const App: React.FC<{}> = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = React.useState('');
  const [showDoneTodos, setShowDoneTodos] = React.useState(false);

  const toggleShowDoneTodos = () => setShowDoneTodos((x) => !x);

  const addNewTodo = () =>
    setTodos([...todos, { id: uuid(), title: newTodoTitle }]);

  const onChangeTodoWithId = (id: number) => (partial: Partial<Todo>) =>
    setTodos(todos.map((x) => (x.id === id ? { ...x, ...partial } : x)));

  return (
    <div className={css.container}>
      <InputGroup
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <Button onClick={addNewTodo} text="Add todo" icon="add" />
      <Button onClick={toggleShowDoneTodos}>
        {showDoneTodos ? 'hide finished TODOs' : 'show finished TODOs'}
      </Button>
      {todos.map((todo) => {
        if (!showDoneTodos && todo.done) {
          return null;
        }
        return (
          <SingleTodo onChangeTodo={onChangeTodoWithId(todo.id)} todo={todo} />
        );
      })}
    </div>
  );
};

export interface SingleTodoProps {
  todo: Todo;
  onChangeTodo(x: Partial<Todo>): void;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo, onChangeTodo }) => {
  return (
    <div className={css.todo}>
      <Checkbox
        checked={todo.done}
        onChange={() => onChangeTodo({ done: !todo.done })}
      />
      {todo.title}
    </div>
  );
};
