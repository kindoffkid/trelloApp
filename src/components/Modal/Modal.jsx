import React from 'react'
export default ({ onClick, input }) => {
  return (
    <>
      <div className='modal__background'></div>
      <div className="modal">
        <h1 className='modal__headline'>Get the Good Stuffs</h1>
        <kbd className='modal__kbr'>
          <label
            className='modal__label'>nickname</label>
          <input
            type="text" className="modal__input"
            {...input}
          />
        </kbd>
        <button
          className='modal__btn'
          onClick={onClick}
        >Select</button>
      </div>
    </>
  )
}