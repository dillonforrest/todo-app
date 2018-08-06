import { Pagelets, AppState, ReactViews } from 'lambdagrid-mfi';

function onEditableChange(event, index) {
  const escapeKeyPressed = event.keyCode == 27;
  if (escapeKeyPressed) {
    appState.updater('cancelEditable')(index);
  } else {
    appState.updater('onEditableChange')(index, event.target.value);
  }
}

function getFilteredTodos(state) {
  return function(filterer, TodoItem) {
    const selectedTodos = state.get('todos').filter(filterer);
    const renderedTodos = selectedTodos.map((todo, index) => TodoItem({
      index,
      value: todo.get('value'),
      isComplete: todo.get('isComplete'),
      isEditing: todo.get('isEditing'),
      editableValue: todo.get('editableValue'),
      onEditableSubmit: () => AppState.updater('onEditableSubmit')(index),
      toggleComplete: () => AppState.updater('toggleComplete')(index),
      onReadOnlyClick: () => AppState.updater('createEditable')(index),
      onEditableChange: e => onEditableChange(e, index),
    }));

    return renderedTodos;
  };
}

function transform(newState) {
  return {
    filter: newState.get('filter'),
    setFilter: appState.updater('setFilter'),
    getFilteredTodos,
  };
}

const TodoApp = Pagelets.createPagelet({
  isAuthorized: AppState.getAuthenticator('anyUser'),
  view: ReactView.getView('TodoApp'),
  transform,
});

Pagelets.registerPagelet({ TodoApp });
