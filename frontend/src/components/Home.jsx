import React from 'react'
import "../styles/Home.css"
import hello from "../assets/hello.png"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <header className="header-bg">
    <div className="header-title">
        Welcome To the Site
    </div>
   <img src={hello} alt='hello' />
    <div className="header-button">
       <Link to="/login">Login</Link>
       <Link to="/signup">Sign Up </Link>
       <Link to="/profile">Profile</Link>
    </div>
    <div className="header-info">
       Page Done By Sujishree
    </div>
</header>
  )
}

export default Home