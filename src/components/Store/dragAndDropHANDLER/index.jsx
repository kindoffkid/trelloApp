import __dragStart from './__dragStart';
import __dragDrop from './__dragDrop';

export default (state, action) => {
  switch (action.type) {
    case 'SET_DRAGGED_ITEM': 
      return __dragStart(state, action)
    case 'SET_DROP_ITEM':
      return __dragDrop(state, action)
  } 
}
