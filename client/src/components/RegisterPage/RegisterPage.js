import { useState } from 'react';

import './RegisterPage.css';

//components
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function RegisterPage({setIsUserLogedIn}) {
    const [isRegisterForm, setIsRegisterForm] = useState(true);

    return (
        <div className='register-div flex-column-center-center'>
            {
                isRegisterForm 
                ? <RegisterForm setIsRegisterForm={setIsRegisterForm}/>
                : <LoginForm setIsRegisterForm={setIsRegisterForm} setIsUserLogedIn={setIsUserLogedIn}/>
            }
        </div>
    )
}

export default RegisterPage;