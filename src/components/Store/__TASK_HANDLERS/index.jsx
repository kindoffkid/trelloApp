import __handleTaskCreation from './__handleTaskCreation';

export default (state, action) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return __handleTaskCreation(state, action)
  }
}