
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from './nav.module.scss'

export default ({ nickname, logged, logOut }) => {
  useEffect(() => console.log('nav'), [])
  return (
    <nav className={styles.navv}>

      <Link to='/' className={styles.nav_link}>
        <i className='fas fa-atom' />
      </Link>

      <ul
        className={styles.wrapperUl}
        style={logged ?
          { display: 'flex' } : {
            display: 'none'
          }
        }>
        <li>n-name: 
          <span className={styles.nickname}>
            {nickname} 
          </span>
        </li>
        <li>
          <ul className={styles.navUl}>
            <li>
              <Link to='/'>Main panel</Link>
            </li>
            <li>
              <a onClick={logOut}>Log out</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
