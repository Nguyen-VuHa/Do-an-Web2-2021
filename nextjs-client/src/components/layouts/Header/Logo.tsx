import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <a href='/' className=''>
        <Image  
            className='object-cover'
            src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" 
            alt="Logo App" 
            width={150}
            height={50}
        />
    </a>
  )
}

export default Logo