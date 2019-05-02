export default (state, { name, value }) => {
  return {
    ...state,
    forms: {
      ...state.forms,
      log_form: {
        ...state.forms.log_form,
        [name]: value
      }
    }
  }
}
