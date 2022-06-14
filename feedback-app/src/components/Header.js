import React from 'react'

function Header({text, bgColor}) {

    const headerStyle = {
        backgroundColor: bgColor
    }
  return (
    <div>
        <header style={headerStyle}>
            <div className='container'>
                <h2>{text}</h2>
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