import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function RegisterForm({ setIsRegisterForm, setIsUserLogedIn, setProfileDetails }) {
    const [registerForm, setRegisterForm] = useState({});
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            // sprawdzenie czy hasło jest takie samo
            // sprawdzenie czy email jest ok
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

            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerForm)
            })
            const data = await response.json();
            if (await data) {
                setProfileDetails(data);
                setIsUserLogedIn(true);
                setRedirect(true);
            }

            setRegisterForm({});
            event.target.reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {redirect
                ? <Navigate replace to={"/home"} />
                : <form className='flex-column-center-center' onSubmit={handleSubmit}>
                    <h1>Create new account</h1>
                    <div className='flex-row-center-center'>
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
                    </div>
                    <button className='go-to-login-button' type='button' onClick={() => setIsRegisterForm(false)}>
                        You already have an account? <span className='sign-in-text'>Sign in</span>
                    </button>
                </form>}
        </>
    )
}

export default RegisterForm;