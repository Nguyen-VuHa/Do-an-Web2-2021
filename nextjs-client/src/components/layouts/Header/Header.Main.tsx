import React from 'react'
import Logo from './Logo'
import Menu from './Menu'
import Control from './Control'

const Header = () => {
  return (
    <div 
        className='
        fixed top-0 left-0 z-999
        w-full h-header bg-layout
        py-header px-10 shadow-2xl
        '
    >   
        <div className='w-full h-full flex justify-between items-center m-auto'>
            {/* Logo */}
            <Logo />
            {/* Menu */}
            <Menu />
            {/* Control */}
            <Control />
        </div>
    </div>
  )
}

export default Header