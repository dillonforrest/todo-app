import { ping } from 'lambdagrid-mfi';

const write = ping.bind(null, 'AppState', 'write');

function onEditableChange(event, index) {
  const escapeKeyPressed = event.keyCode == 27;
  if (escapeKeyPressed) {
    write('cancelEditable')(index);
  } else {
    write('onEditableChange')(index, event.target.value);
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
      onEditableSubmit: () => write('onEditableSubmit')(index),
      toggleComplete: () => write('toggleComplete')(index),
      onReadOnlyClick: () => write('createEditable')(index),
      onEditableChange: e => onEditableChange(e, index),
    }));

    return renderedTodos;
  };
}

function transform(state) {
  return {
    filter: state.get('filter'),
    setFilter: write('setFilter'),
    getFilteredTodos: getFilteredTodos(state),
  };
}

const TodoApp = ping('Pagelets', 'create pagelet', {
  isAuthorized: ping('AppState', 'get authorizer', 'anyUser'),
  view: ping('ReactViews', 'get view', 'TodoApp'),
  transform,
});

ping('Pagelets', 'set pagelets', { TodoApp });
