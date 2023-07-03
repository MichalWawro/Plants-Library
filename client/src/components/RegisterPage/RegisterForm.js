import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function RegisterForm({ setIsRegisterForm, setIsUserLogedIn, setProfileDetails }) {
    const [registerForm, setRegisterForm] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState("none");
    const [isPasswordValid, setIsPasswordValid] = useState("none");
    const [isConfrimValid, setIsConfirmValid] = useState("none");
    const [isEmailValid, setIsEmailValid] = useState("none");
    const [displayInvalidInput, setDisplayInvalidInput] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (isUsernameValid === "valid"
                && isPasswordValid === "valid"
                && isConfrimValid === "valid"
                && isEmailValid === "valid") {
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
            }else{
                setDisplayInvalidInput(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleUsernameOnChange = (event) => {
        setRegisterForm(Object.assign(registerForm, { username: event.target.value }));
        if (event.target.value.length >= 4) {
            setIsUsernameValid("valid");
        } else {
            setIsUsernameValid("invalid");
        }
    }

    const handlePasswordOnChange = (event) => {
        setRegisterForm(Object.assign(registerForm, { password: event.target.value }));
        if (event.target.value.length >= 6) {
            setIsPasswordValid("valid");
        } else {
            setIsPasswordValid("invalid");
        }
    }

    const handleConfirmPasswordOnChange = (event) => {
        setRegisterForm(Object.assign(registerForm, { confirmedPassword: event.target.value }));
        if (event.target.value === registerForm.password) {
            setIsConfirmValid("valid");
        } else {
            setIsConfirmValid("invalid");
        }
    }

    const handleEmailOnChange = (event) => {
        setRegisterForm(Object.assign(registerForm, { email: event.target.value }))
        if (registerForm.email.match(/^[a-z0-9]*@[a-z0-9]+[.]{1}[a-z0-9]+$/i)) {
            setIsEmailValid("valid");
        } else {
            setIsEmailValid("invalid");
        }
    }

    return (
        <>
            {redirect
                ? <Navigate replace to={"/home"} />
                : <form className='register-form flex-column-center-center' onSubmit={handleSubmit}>
                    <h1>Create new account</h1>
                    {
                        displayInvalidInput && <h3 className='invalid'>Entered data is incorrect</h3>
                    }
                    <div className='flex-row-center-center'>
                        <div className='form-div-container flex-column-center-center'>
                            <div className='field-container flex-column-center-center'>
                                <div className='input-box flex-column-center-center'>
                                    <input type='text' id='username' className='register-input' required
                                        onChange={handleUsernameOnChange} />
                                    <label htmlFor='username'>Username</label>
                                </div>
                                {isUsernameValid === "valid" && <div className='valid'>Correct</div>}
                                {isUsernameValid === "invalid" && <div className='invalid'>Username must be at least 4 characters long</div>}
                            </div>
                            <div className='field-container flex-column-center-center'>
                                <div className='input-box flex-column-center-center'>
                                    <input type='password' id='password' className='register-input' required
                                        onChange={handlePasswordOnChange} />
                                    <label htmlFor='password'>Password</label>
                                </div>
                                {isPasswordValid === "valid" && <div className='valid'>Correct</div>}
                                {isPasswordValid === "invalid" && <div className='invalid'>Password must be at least 6 characters long</div>}
                            </div>
                            <div className='field-container flex-column-center-center'>
                                <div className='input-box flex-column-center-center'>
                                    <input type='password' id='confirmPassword' className='register-input' required
                                        onChange={handleConfirmPasswordOnChange} />
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                </div>
                                {isConfrimValid === "valid" && <div className='valid'>Correct</div>}
                                {isConfrimValid === "invalid" && <div className='invalid'>Passwords are not the same</div>}
                            </div>
                            <div className='field-container flex-column-center-center'>
                                <div className='input-box flex-column-center-center'>
                                    <input type='text' id='email' className='register-input' required
                                        onChange={handleEmailOnChange} />
                                    <label htmlFor='email'>Email</label>
                                </div>
                                {isEmailValid === "valid" && <div className='valid'>Correct</div>}
                                {isEmailValid === "invalid" && <div className='invalid'>Email is incorrect</div>}
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