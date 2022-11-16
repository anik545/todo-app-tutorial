import { Button, Checkbox, Icon, InputGroup } from '@blueprintjs/core';
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
  const [currentTodo, setCurrentTodo] = React.useState('');
  const [showDoneTodos, setShowDoneTodos] = React.useState(false);
  const onChangeTodoWithId = (id: number) => (partial: Partial<Todo>) =>
    setTodos(todos.map((x) => (x.id === id ? { ...x, ...partial } : x)));
  const onRemoveTodoWithId = (id: number) => () =>
    setTodos(
      todos.map((x) => (x.id === id ? null : x)).filter((x) => x != null)
    );
  return (
    <div className={css.container}>
      <InputGroup
        type="text"
        value={currentTodo}
        onChange={(e) => setCurrentTodo(e.target.value)}
      />
      <Button
        onClick={() =>
          setTodos([...todos, { id: uuid(), title: currentTodo, done: false }])
        }
      >
        Add todo
      </Button>
      <Button onClick={() => setShowDoneTodos((x) => !x)}>
        {showDoneTodos ? 'hide finished TODOs' : 'show finished TODOs'}
      </Button>
      {todos.map((todo) => {
        if (!showDoneTodos && todo.done) {
          return null;
        }
        return (
          <SingleTodo
            onChangeTodo={onChangeTodoWithId(todo.id)}
            todo={todo}
            onDeleteTodo={onRemoveTodoWithId(todo.id)}
          />
        );
      })}
    </div>
  );
};

export interface SingleTodoProps {
  todo: Todo;
  onChangeTodo(x: Partial<Todo>): void;
  onDeleteTodo(): void;
}

const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  onChangeTodo,
  onDeleteTodo,
}) => {
  return (
    <div className={css.todo}>
      <Checkbox
        checked={todo.done}
        onChange={() => onChangeTodo({ done: !todo.done })}
      />
      {todo.title}
      <Icon icon="trash" onClick={() => onDeleteTodo()} />
    </div>
  );
};
