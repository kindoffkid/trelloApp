import React from 'react'


export default ({ flash }) => {
  if ( flash ) {
    return (
      <div className='block_section flash'
        style={{ display: 'block' }}>
        {' '}
        {flash}{' '}
      </div>
    )
  } 
  return null
}
