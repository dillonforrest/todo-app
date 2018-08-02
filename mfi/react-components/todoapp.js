import broker from 'lambdagrid/mfi';
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
        <FormControl type="text" value={props.editableValue} onChange={props.onEditableChange} />
      </FormGroup>
    </form>
  </li>);

  const readOnly = (<li>
    <Checkbox checked={props.isComplete} onChange={props.toggleComplete}>
      {props.readonlyValue}
    </Checkbox>
  </li>);

  return props.isEditing ? editable : readOnly;
}
