import { ReactViews } from 'lambdagrid-mfi';
import React from 'react';
import {
  FormGroup,
  FormControl,
  Checkbox,
} from 'lambdagrid/react-components'

function TodoItem(props) {
  const editable = (<li>
    <form onSubmit={props.onEditableSubmit}>
      <FormGroup controlId="editable-todo-item">
        <FormControl
          type="text"
          value={props.editableValue}
          onChange={props.onEditableChange} />
      </FormGroup>
    </form>
  </li>);

  const readOnly = (<li key={props.index}>
    <Checkbox checked={props.isComplete} onChange={props.toggleComplete}>
      <span onClick={props.onReadOnlyClick}>
        {props.value}
      </span>
    </Checkbox>
  </li>);

  return props.isEditing ? editable : readOnly;
}

function TodoList(props) {
  return (<div>
    <p>Showing {props.filter}</p>
    <ul>
      {props.getFilteredTodos(props.todos, TodoItem)}
    </ul>
  </div>);
}

function Filter(props) {
  return (<p>
    <a href="" onClick={() => props.setFilter('all')}>
      Show all
    </a>
    <span> | </span>
    <a href="" onClick={() => props.setFilter('complete')}>
      Show complete
    </a>
    <span> | </span>
    <a href="" onClick={() => props.setFilter('incomplete')}>
      Show incomplete
    </a>
  </p>);
}

function TodoApp(props) {
  <TodoList props={props} />
  <Filter props={props} />
}

ReactViews.registerPageletBody('TodoApp', TodoApp);
