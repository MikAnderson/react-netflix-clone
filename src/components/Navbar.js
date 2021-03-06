import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
const Navbar = () => {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else {
        handleShow(false)
      }
    })
    return () => window.removeEventListener('scroll')
  }, [])

  return (
    <div className={`navbar ${show && 'navbar__displayBar'}`}>
      <img
        className="navbar__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Lgo"
      />

      <img
        className="navbar__avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Netflix Avatar"
      />
    </div>
  )
}

export default Navbar
