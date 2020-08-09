import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from './context'
import './css.css'

const Login = () => {

    const [status, setStatus] = useContext(Context)
    const history = useHistory();
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (input['username'].replace(/\s/g, '') !== "" && input['password'].replace(/\s/g, '') !== "") {
            if (input['username'] === 'sanbercode' && Number(input['password']) === 111) {
                setStatus(true)
                history.push("/movies");
            } else {
                setStatus(false)
            }
        }
    }

    return (
        <>
            <div className="login-form h100vh">
                <div className="card">
                    <div className="title">
                        <h3 style={{ textAlign: "center", color: "white" }}>Sign In Sanbercode</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>Masukan Username</label>
                        <br />
                        <input type="text" className="c-form-control c-custom" value={input.username} onChange={handleChange} name="username" placeholder="sanbercode" />
                        <br />
                        <label>Masukan Password</label>
                        <input type="password" className="c-form-control c-custom" value={input.password} onChange={handleChange} name="password" placeholder="111" />
                        <br />
                        <button type="submit" className="btn-edit">Submit</button>
                        {/* {alert} */}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;