import React from 'react'
import "./header.css"


const header = () => {
  

    return (
        <div>
            <div className='main-header-container'>
                <div className='header-top'>
                    <p>1445 FARMER ST., DETROIT, MI 48226</p>
                </div>

                <nav className='navbar'>
                    <ul>
                        <li>
                            <a href="">ABOUT US</a>
                        </li>
                        <li>
                            <a href="">MENU</a>
                        </li>
                        <li>
                            <a href="">LOCATION & HOUR</a>
                        </li>
                        <li>
                            <a href="">JOBS</a>
                        </li>
                        <li>
                            <a href="">GIFT CARDS</a>
                        </li>
                        <li>
                            <a href="">ONLINR ORDERING</a>
                        </li>

                    </ul>
                </nav>
            </div>


          


        </div>
    )
}

export default header