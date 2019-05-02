export default {
  nickname: '',
  logged: false,
  boards: [],
  mainMenu: {
    state: false,
    input: '',
    flash: ''
  },
  fetchStatus: false,
  modal: {
    state: true,
    input: ''
  },
  draggedItem: {
    listIndex: null,
    taskIndex: null,

    listId: null,
    taskId: null
  },
  forms: {
    log_form: {
      log_email: '',
      log_pass: ''
    },
    
    reg_form: {
      reg_uname: '',
      reg_email: '',
      reg_pass: ''
    }
  }
}