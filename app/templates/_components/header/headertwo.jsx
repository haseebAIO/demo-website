import React from 'react'
import "./headertwo.css"
import Image from 'next/image'


const headertwo = () => {
    const Logo = 'https://images.getbento.com/oS4tMQP5SlmFHMHXbtLw_logo.png';
    return (
        <div>
            <div className='main_logo'>
                <Image src={Logo} alt='logo' width={100} height={100} />
            </div>

            <div className='navabar'>
                <ul className='navbar-list'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>LOCATION & HOURS</li>
                    <li> FAQ</li>
                    <li>CONTACT US</li>
                </ul>
            </div>
        </div>
    )
}

export default headertwo