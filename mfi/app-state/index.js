import { AppState } from 'lambdagrid-mfi';

// First, let's create the updaters

function cancelEditable(prevState) {
  const nextState = prevState.remove('editable');
  return nextState;
}

function onEditableChange(prevState, newEditableValue) {
  const nextState = prevState.update('editable', () => newEditable);
  return nextState;
}

function setFilter(prevState, nextFilter) {
  const nextState = prevState.update('filter', () => nextFilter);
  return nextState;
}

function onEditableSubmit(prevState, index) {
  const newValue = AppState.get('editable');
  const editableDeleted = cancelEditable(prevState);
  const nextState = editableDeleted.updateIn(['props', index, 'value'], () => newValue);
  return nextState;
}

function toggleComplete(prevState, index) {
  const nextState = prevState.updateIn(['todos', index, 'isComplete'], x => !x);
  return nextState;
}

function createEditable(prevState, index) {
  const newEditable = prevState.getIn(['props', index, 'value']);
  const nextState = prevState.set('editable', newEditable);
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
