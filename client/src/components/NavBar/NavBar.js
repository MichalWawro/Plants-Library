import './NavBar.css';
import PAGES from '../../constants/enums';

import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar(props) {
    const {setProfileDetails, setIsUserLogedIn, isUserLogedIn} = props;
    const [isSignOut, setIsSignOut] = useState(false);

    const handleSignOut = () => {
        setProfileDetails({});
        setIsUserLogedIn(false);
    }

    return (
        <>
            {isSignOut
                ? <Navigate replace to={PAGES.HOME} />
                : <div className='navbar-div flex-row-center-center'>
                    <Link to={PAGES.HOME}><button type='button'>Home</button></Link>

                    {isUserLogedIn
                        ?
                        <>
                            <Link to={PAGES.SEARCH}><button type='button'>Search</button></Link>
                            <Link to={PAGES.MYPLANTS}><button type='button'>My Plants</button></Link>
                            <Link to={PAGES.PROFILE}><button type='button'>Profile</button></Link>
                            <button type='button' onClick={handleSignOut}>Sign out</button>
                        </>
                        :
                        <>
                            <Link to={PAGES.REGISTER}><button type='button'>Sign In/Register</button></Link>
                        </>
                    }
                </div>}
        </>
    )
}

export default Navbar;