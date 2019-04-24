import React from 'react'
import '../../component-assets/FancySpinner.scss'
export default () => {
  return (
    <div className='spinner'>
      <h1>Working with database, please wait</h1>
      <div className='lds-ripple'>
        <div />
        <div />
        </div>
    </div>
  )
}
