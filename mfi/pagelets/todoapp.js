import { pagelets } from 'lambdagrid-mfi';

const TodoApp = pagelets.createPagelet();

function transform(appState) {
  return {
    ...appState,
    setFilter: newFilter => 
  };
}

TodoApp.onRequest(() => ({
  'status code': '200',
  'transform': transform,
  'pageletBody': 'TodoApp'
}));

pagelets.registerPagelet('TodoApp', TodoApp);
