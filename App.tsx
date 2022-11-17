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
    <React.Fragment>
      <div className={css.container}>
        <h1>TODOs</h1>
        <InputGroup
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          onClick={() =>
            setTodos([
              ...todos,
              { id: Math.random().toString(), title: inputValue },
            ])
          }
        >
          Add TODO
        </Button>
        <div>this should be a list of todos</div>
        {todos.map((x) => (
          <SingleTodo todo={x} onDelete={onDelete} />
        ))}
      </div>
    </React.Fragment>
  );
};

export const SingleTodo: React.FC<{
  todo: Todo;
  onDelete: (id: string) => void;
}> = ({ todo, onDelete }) => {
  return (
    <div>
      {todo.title}
      <Icon icon="trash" onClick={() => onDelete(todo.id)} />
    </div>
  );
};
