import { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
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

        await fetch("http://localhost:5000/api/users",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registerForm)
        })

        setRegisterForm(Object.assign({}));
        event.target.reset();
    }

    return (
        <div className='register-div flex-column-center-center'>    
                <h1>Create new account</h1>
                {
                    isDataCorrect
                        ? ""
                        : <h2>Input data is invalid</h2>
                }
                <form className='flex-column-center-center' onSubmit={handleSubmit}>
                    <div className='flex-row-center-center'>
                        <div className='register-label-div flex-column-center-center'>
                            <label htmlFor='username'>Username:</label>
                            <label htmlFor='password'>Password:</label>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <label htmlFor='email'>Email:</label>
                        </div>
                        <div className='register-input-div flex-column-center-center'>
                            <input type='text' id='username'
                                onChange={(e) => setRegisterForm(Object.assign(registerForm, { username: e.target.value }))} />
                            <input type='password' id='password'
                                onChange={(e) => setRegisterForm(Object.assign(registerForm, { password: e.target.value }))} />
                            <input type='password' id='confirmPassword'
                                onChange={(e) => setRegisterForm(Object.assign(registerForm, { confirmedPassword: e.target.value }))} />
                            <input type='email' id='email'
                                onChange={(e) => setRegisterForm(Object.assign(registerForm, { email: e.target.value }))} />
                        </div>
                    </div>
                    <button type='submit' className='basic-button-layout'>Create Account</button>
                </form>
        </div>
    )
}

export default RegisterPage;