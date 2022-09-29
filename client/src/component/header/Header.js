import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()
    const isActive = (path) => {
        if (location.pathname === path) return { color: "#ff9900" }
        else return { color: "black" }
    }
    return (
        <div>
            <ul className='nav nav-tabs justify-content-center'>
                <li className='nav-item'>
                    <Link
                        className='nav-link fs-6'
                        style={isActive("/")}
                        to="/">
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        className='nav-link fs-6'
                        style={isActive("/create")}
                        to="/create">
                        Añadir Nuevo Integrante
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        className='nav-link fs-6'
                        style={isActive("/mascotas")}
                        to="/mascotas">
                        Todos nuestros Integrantes!
                    </Link>
                </li>
            </ul>
        </div>
    )
}
