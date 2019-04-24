import React, { useContext } from 'react'
import { Ctx } from '../../Ctx'

export default () => {
  const { store, dispatch } = useContext(Ctx)
  return (
    store.loggs ?
      store.loggs.map((elem, index) => {
        return <div style={{
          position: 'absolute',
          top: '5%',
          right: '10%'
        }}
        key={index}>
          <div>
            <span>{elem.time}</span>
            <span>{elem.nickname}</span>
          </div>
          {elem.log}
        </div>
        
      }) : null
  )
}