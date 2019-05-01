import React from 'react'
import '../../FancySpinner.scss'
export default ({ message }) => {
  return (
    <div className='spinner'>
      {/* <h1>Working with database, please wait</h1> */}
      <div className='lds-ripple'>
        <div />
        <div />
        </div>
    </div>
  )
}
