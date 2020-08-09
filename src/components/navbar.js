import React, { useContext } from 'react'
import logo from '../img/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { Context } from './context'

const Navbar = () => {
    const [status, setStatus] = useContext(Context)
    const history = useHistory()

    const handleLogout = () => {
        setStatus(false)
        history.push('/')
    }

    return (
        <>
            <header>
                <img alt="images" src={logo} width="200px" />
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home </Link>
                        </li>
                        <li>
                            <Link to="/about">About </Link>
                        </li>
                        {status ?
                            <>
                                <li>
                                    <Link to="/movies">Movie List Editor</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} type="button" className="btn btn-danger">Logout</button>
                                </li>
                            </>
                            :
                            <li>
                                <Link to="/login">
                                    <button type="button" className="btn-warning">Login</button>
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Navbar;