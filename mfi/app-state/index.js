import { AppState } from 'lambdagrid-mfi';

// First, let's create the updaters

function todoPath(index) {
  return ['todos', index];
}

function cancelEditable(prevState, index) {
  const path = todoPath(index);

  const todo = prevState.getIn(path);
  const newTodo = todo.set('isEditing', false).set('editableValue', null);

  const nextState = prevState.setIn(path, newTodo);
  return nextState;
}

function onEditableChange(prevState, index, newEditableValue) {
  const path = todoPath(index);

  const todo = prevState.getIn(path);
  const newTodo = todo.set('editableValue', newEditableValue);

  const nextState = prevState.setIn(path, newTodo);
  return nextState;
}

function setFilter(prevState, nextFilter) {
  const nextState = prevState.update('filter', () => nextFilter);
  return nextState;
}

function onEditableSubmit(prevState, index) {
  const path = todoPath(index);

  const todo = prevState.getIn(path);
  const newValue = todo.get('editableValue');
  const newTodo = todo.set('isEditing', false).set('value', newValue);

  const nextState = prevState.setIn(path, newTodo);
  return nextState;
}

function toggleComplete(prevState, index) {
  const nextState = prevState.updateIn(['todos', index, 'isComplete'], x => !x);
  return nextState;
}

function createEditable(prevState, index) {
  const path = todoPath(index);

  const todo = prevState.getIn(path);
  const initialEditableValue = todo.get('value');
  const newTodo = todo.set('isEditing', true)
    .set('editableValue', initialEditableValue);

  const nextState = prevState.setIn(path, newTodo);
  return nextState;
}

AppState.registerUpdaters(
  cancelEditable,
  onEditableChange,
  setFilter,
  onEditableSubmit,
  toggleComplete,
  createEditable,
);

// Then, let's create authenticators.

function anyUser(state) {
  return true;
}

function atLeastReadAccess(state) {
  return AppState.getIn(['auth', 'access levels', 'read']);
}

function atLeastWriteAccess(state) {
  return AppState.getIn(['auth', 'access levels', 'write']);
}

function atLeastAdmin(state) {
  return AppState.getIn(['auth', 'access levels', 'admin']);
}

AppState.registerAuthenticators({
  anyUser,
  atLeastReadAccess,
  atLeastWriteAccess,
  atLeastAdmin,
})
