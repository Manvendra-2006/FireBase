import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../FireBase/FireBaseProvider'

const Navbar = () => {
  const firebase = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await firebase.signout()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <nav style={styles.navbar}>
        
        {/* Logo */}
        <div style={styles.logo}>
          BookStore
        </div>

        {/* Nav Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>

          <Link to="/book/add" style={styles.addButton}>
            Add Listing
          </Link>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>

      </nav>

      <Outlet />
    </>
  )
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    backgroundColor: '#111827',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },

  logo: {
    color: '#60A5FA',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },

  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px'
  },

  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    fontWeight: '500'
  },

  addButton: {
    textDecoration: 'none',
    backgroundColor: '#2563EB',
    color: 'white',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    transition: '0.3s'
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  }
}

export default Navbar