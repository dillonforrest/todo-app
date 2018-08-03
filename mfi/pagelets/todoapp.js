import { pagelets, appState } from 'lambdagrid-mfi';

const TodoApp = pagelets.createPagelet();

function onEditableChange({ keyCode }) {
  const escapeKeyPressed = keyCode == 27;
  if (escapeKeyPressed) {
    appState.updater('cancelEditable');
  } else {
    appState.updater('onEditableChange');
  }
}

function transform(newState) {
  return {
    ...newState,
    setFilter: appState.updater('setFilter'),
    onEditableSubmit: appState.updater('onEditableSubmit'),
    toggleComplete: appState.updater('toggleComplete'),
    onReadOnlyClick: appState.updater('createEditable'),
    onEditableChange,
  };
}

TodoApp.onRequest(() => ({
  'validator': () => true,
  'transform': transform,
  'pageletBody': 'TodoApp'
}));

pagelets.registerPagelet('TodoApp', TodoApp);
