import './NavBar.css';
import PAGES from '../../constants/enums';

import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar(props) {
    const { setProfileDetails, setIsUserLogedIn, isUserLogedIn } = props;
    const [isSignOut, setIsSignOut] = useState(false);

    const handleSignOut = () => {
        setProfileDetails({});
        setIsUserLogedIn(false);
        //setIsSignOut(true);
    }

    return (
        <>
            <div className='navbar-div flex-row-center-center'>
                {isUserLogedIn
                    ?
                    <>
                        <Link to={PAGES.MYPLANTS}><button type='button'>My Plants</button></Link>
                        <Link to={PAGES.SEARCH}><button type='button'>Search</button></Link>
                        <button className="sign-out-button" type='button' onClick={handleSignOut}>Sign out</button>
                    </>
                    :
                    <>
                        <Navigate replace to={PAGES.HOME} />
                        <Link to={PAGES.HOME}><button type='button'>Home</button></Link>
                        <Link to={PAGES.REGISTER}><button type='button'>Sign In/Register</button></Link>
                    </>
                }
            </div>
        </>
    )
}

export default Navbar;