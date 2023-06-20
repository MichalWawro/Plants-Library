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
        if (registerForm.password === registerForm.confirmedPassword
            && registerForm.email.match(/^[a-z0-9]*@[a-z0-9]*[.]{1}[a-z0-9]*$/i)
            && registerForm.password.length > 0) {
            console.log("wykonaj");
        }
        else {
            setIsDataCorrect(false);
        }
        

        // sprawdzenie czy nazwa użytkownika jest wolna
        //po dodawaniu do bazy

        setRegisterForm(Object.assign({}));
        event.target.reset();
    }

    return (
        <div className='flex-column-center-center'>
            <header>
                <h1>Create new account</h1>
                {
                    isDataCorrect
                        ? ""
                        : <h2>Input data is invalid</h2>
                }
            </header>
            <main className='main-register flex-column-center-center'>
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
                    <button type='submit'>Create Account</button>
                </form>
            </main>
        </div>
    )
}

export default RegisterPage;