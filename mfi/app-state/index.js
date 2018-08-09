import { ping } from 'lambdagrid-mfi';

// First, let's create the updaters

function cancelEditable(state, index) {
  return state.setIn(['todos', index, 'isEditing'], false);
}

function onEditableChange(state, index, newEditableValue) {
  return state.setIn(['todos', index, 'editableValue'], newEditableValue);
}

function setFilter(state, nextFilter) {
  return state.set('filter', nextFilter);
}

function onEditableSubmit(state, index) {
  const newValue = state.getIn(['todos', index, 'editableValue']);
  const update = todo => todo.set('isEditing', false).set('value', newValue);
  return state.updateIn(['todos', index], update);
}

function toggleComplete(state, index) {
  return state.updateIn(['todos', index, 'isComplete'], x => !x);
}

function createEditable(state, index) {
  const initialEditableValue = state.getIn(['todos', index, 'value']);
  const update = todo => todo.set('isEditing', true).set('editableValue', initialEditableValue);
  return state.updateIn(['todos', index], update);
}

ping('AppState', 'set writers', {
  cancelEditable,
  onEditableChange,
  setFilter,
  onEditableSubmit,
  toggleComplete,
  createEditable,
});

// Then, let's create authenticators.

function anyUser(state) {
  return true;
}

function atLeastReadAccess(state) {
  return state.getIn(['auth', 'access levels', 'read']);
}

function atLeastWriteAccess(state) {
  return state.getIn(['auth', 'access levels', 'write']);
}

function atLeastAdmin(state) {
  return state.getIn(['auth', 'access levels', 'admin']);
}

ping('AppState', 'set authorizers', {
  anyUser,
  atLeastReadAccess,
  atLeastWriteAccess,
  atLeastAdmin,
});
