import { useState } from 'react';
import { Link } from 'react-router-dom';

import './RegisterPage.css';

function RegisterPage({ PAGES }) {
    const [registerForm, setRegisterForm] = useState({});
    const [isDataCorrect, setIsDataCorrect] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(registerForm);

        // sprawdzenie czy hasło jest takie samo
        // sprawdzenie czy email jest git
        // if (registerForm.password === registerForm.confirmedPassword
        //     && registerForm.email.match(/^[a-z0-9]*@[a-z0-9]*[.]{1}[a-z0-9]*$/i)
        //     && registerForm.password.length > 0) {
        //     console.log("wykonaj");
        // }
        // else {
        //     setIsDataCorrect(false);
        // }
        // sprawdzenie czy nazwa użytkownika jest wolna
        //po dodawaniu do bazy

        await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerForm)
        })

        setRegisterForm(Object.assign({}));
        event.target.reset();
    }

    return (
        <div className='register-div flex-column-center-center'>

            {
                isDataCorrect
                    ? ""
                    : <h2>Input data is invalid</h2>
            }
            <form className='flex-column-center-center' onSubmit={handleSubmit}>
                <h1>Create new account</h1>
                <div className='form-div-container flex-column-center-center'>
                    <div className='input-box flex-column-center-center'>
                        <input type='text' id='username' className='register-input' required
                            onChange={(e) => setRegisterForm(Object.assign(registerForm, { username: e.target.value }))} />
                        <label htmlFor='username'>Username</label>
                    </div>
                    <div className='input-box flex-column-center-center'>
                        <input type='password' id='password' className='register-input' required
                            onChange={(e) => setRegisterForm(Object.assign(registerForm, { password: e.target.value }))} />
                        <label htmlFor='password'>Password</label>
                    </div>
                    <div className='input-box flex-column-center-center'>
                        <input type='password' id='confirmPassword' className='register-input' required
                            onChange={(e) => setRegisterForm(Object.assign(registerForm, { confirmedPassword: e.target.value }))} />
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                    </div>
                    <div className='input-box flex-column-center-center'>
                        <input type='text' id='email' className='register-input' required
                            onChange={(e) => setRegisterForm(Object.assign(registerForm, { email: e.target.value }))} />
                        <label htmlFor='email'>Email</label>
                    </div>
                    <button type='submit' className='create-account-button'>Create Account</button>
                </div>
                <Link to={PAGES.current.LOGIN}>
                    <button className='go-to-login-button' type='button'>
                        You already have an account? <span className='sign-in-text'>Sign in</span>
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default RegisterPage;