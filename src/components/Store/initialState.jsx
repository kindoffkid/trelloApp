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
    log: {
      email: '',
      password: ''
    },
    reg: {
      username: '',
      email: '',
      password: ''
    },
    reg_form: {
      reg_uname: '',
      reg_email: '',
      reg_pass: ''
    }
  }
}