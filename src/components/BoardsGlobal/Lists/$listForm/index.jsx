import React from 'react'
import FormButton from './__formButton'
import FormInput from './__formInput'

export default ({
  form,
  boardId,
  listId
}) => {
  return (
    <div className="list_form">
      <FormButton
        state={form.state}
        boardId={boardId}
        listId={listId}
        />
      <FormInput
        {...form}
        boardId={boardId}
        listId={listId}
      />      
    </div>
  )
}