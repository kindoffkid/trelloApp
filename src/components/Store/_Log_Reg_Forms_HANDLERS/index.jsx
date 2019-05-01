export default (state, action) => {
  switch (action.type) {
    case 'SET_REG_EMAIL':
      return {
        ...state,
        forms: {
          ...state.forms,
          reg: {
            ...state.forms.reg,
            email: action.payload
          }
        }
      }
    case 'SET_REG_PASSWORD':
      return {
        ...state,
        forms: {
          ...state.forms,
          reg: {
            ...state.forms.reg,
            password: action.payload
          }
        }
      }
  }
}