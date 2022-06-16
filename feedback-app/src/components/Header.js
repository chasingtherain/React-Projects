import React from 'react'
import { Link } from 'react-router-dom'

function Header({text, bgColor}) {

    const headerStyle = {
        backgroundColor: bgColor
    }
  return (
    <div>
        <header style={headerStyle}>
            <div className='container'>
                <Link to="/">
                    <h2>{text}</h2>
                </Link>
            </div>
        </header>
    </div>
  )
}

Header.defaultProps = {
    text: "Feedback UI",
    bgColor: "pink"
}

export default Header