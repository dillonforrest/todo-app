import { Pagelets } from 'lambdagrid-mfi';
import { pointTo } from 'lambdagrid-mfi/utils';

function onEditableChange(event, index) {
  const escapeKeyPressed = event.keyCode == 27;
  if (escapeKeyPressed) {
    appState.updater('cancelEditable')(index);
  } else {
    appState.updater('onEditableChange')(index, event.target.value);
  }
}

function getFilteredTodos(state) {
  return function(TodoItem) {
    const filter = state.get('filter');
    const filterer = filter == 'all' ? () => true
      : filter == 'complete' ? todo => todo.get('isComplete') === true
      : todo => todo.get('isComplete') === false;

    const selectedTodos = todos.filter(filterer);
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
    getFilteredTodos: getFilteredTodos(newState),
  };
}

const TodoApp = Pagelets.createPagelet({
  isAuthorized: pointTo('AppState', 'getAuthorizer', 'anyUser'),
  view: pointTo('ReactViews', 'getReactView', 'TodoApp'),
  transform,
});

Pagelets.registerPagelet({ TodoApp });
