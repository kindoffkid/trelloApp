export default (state, { name, value }) => {
  return {
    ...state,
    forms: {
      ...state.forms,
      reg_form: {
        ...state.forms.reg_form,
        [name]: value
      }
    }
  }
}