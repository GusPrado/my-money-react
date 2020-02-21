import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Header = () => {
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }, [])
  const logout = () => {
    localStorage.removeItem('token')
    setLogged(false)
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
      <Link to="/" className="navbar-brand">My Money</Link>
      {
        logged && 
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button type="button" className="nav-link btn btn-outline" onClick={logout}>Sair</button>
          </li>
        </ul>
      }   
      </div>
    </nav>
  )
}

export default Header