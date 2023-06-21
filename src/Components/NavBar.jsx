import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
    let cart_items=useSelector(store=>store.cartStore.cart_items)
    let count = cart_items.length
    console.log(count)
    return (
        <>
            <ul className="nav justify-content-center fs-3  bg-dark">
                <li className="nav-item">
                    <Link className="nav-link text-white " aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white position-relative" to="/Cart">Cart
                    {
                        count >0 &&
                        <span className='position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger'> {count} </span>
                    }
                    
                    </Link>
                </li>

            </ul>
        </>
    )
}

export default NavBar