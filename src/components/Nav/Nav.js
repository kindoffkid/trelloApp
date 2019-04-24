import '../../component-assets/Nav.scss'
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
export default ({nickname}) => {
  useEffect(() => console.log( 'nav' ),[])
  return (
    <nav>
      <Link to="/" className="nav_link">
        <i className="fas fa-atom" />
      </Link>
      <h1>Hello, {nickname}</h1>
    </nav>
  );
}
