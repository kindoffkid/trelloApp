import React, { useRef, useState, useEffect } from 'react'
export default ({ title }) => { 
  const [inputValue, setValue] = useState(title)
  const [ menuState, setMenuState] = useState(false)
  const inputRef = useRef(null)

  const handleClick = event => {
    event.stopPropagation()
    inputRef.current.removeAttribute('readonly')
    inputRef.current.focus()
  }
   return (
     <div
       className='board_title'
       style={{
         position: 'relative'
       }}
     onClick={() => setMenuState(!menuState)}>
       <div
         style={{
           position: 'absolute',
           top: 0,
           right: '-100%',
           borderBottom: '1px solid #000'
         }}>
         <div style={
           menuState ? 
            { display: 'block', animation:'creation .3s linear forwards' }
            : { display: 'none' }
         }>
         <span style={{ display: 'block' }}>Delete List</span>
         <span style={{ display: 'block', cursor: 'pointer' }}
         onClick={handleClick}
         >Change listName</span>
         <span style={{ display: 'block' }}>Clear Log</span>

         </div>
       </div>
         <input
           readOnly
           type='text'
           ref={inputRef}
           value={inputValue}
           style={{
             textAlign: 'center',
             background: 'transparent',
             border: 'none',
             boxShadow: 'none',
             outline: 'none'
           }}
           onChange={event => setValue(event.target.value)}
         />
       {/* {title} */}
     </div>
   )
}
