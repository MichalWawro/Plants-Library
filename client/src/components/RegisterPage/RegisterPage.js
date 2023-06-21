import { useState } from 'react';

import './RegisterPage.css';

//components
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function RegisterPage({ setIsUserLogedIn }) {
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    return (
        <div className='register-div flex-column-center-center'>
            <div className='register-window flex-row-center-center'>
                <div className='part-background'></div>
                {
                    isRegisterForm
                        ? <RegisterForm setIsRegisterForm={setIsRegisterForm} />
                        : <LoginForm setIsRegisterForm={setIsRegisterForm} setIsUserLogedIn={setIsUserLogedIn} />
                }
            </div>
        </div>
    )
}

export default RegisterPage;