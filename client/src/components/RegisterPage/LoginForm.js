import { useState } from "react";
import { Navigate } from "react-router-dom";

function LoginForm({ setIsRegisterForm, setIsUserLogedIn }) {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            }).then(
                res => {
                    if (res.redirected === true) {
                        setIsUserLogedIn(true)
                        setIsAuthenticated(true);
                    }
                })

            setLoginData(Object.assign({
                username: "",
                password: ""
            }))
            event.target.reset();

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            {isAuthenticated
                ? <Navigate replace to="/home" />
                : <form className='flex-column-center-center' onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <div className='form-div-container flex-column-center-center'>
                        <div className='input-box flex-column-center-center'>
                            <input type='text' id='username' className='register-input' required
                                onChange={(e) => setLoginData(Object.assign(loginData, { username: e.target.value }))} />
                            <label htmlFor='username'>Username</label>
                        </div>
                        <div className='input-box flex-column-center-center'>
                            <input type='password' id='password' className='register-input' required
                                onChange={(e) => setLoginData(Object.assign(loginData, { password: e.target.value }))} />
                            <label htmlFor='password'>Password</label>
                        </div>
                        <button type='submit' className='create-account-button'>Log In</button>
                    </div>
                    <button className='go-to-login-button' type='button' onClick={() => setIsRegisterForm(true)}>
                        You don't have an account? <span className='sign-in-text'>Register</span>
                    </button>
                </form>}
        </>
    )
}

export default LoginForm;