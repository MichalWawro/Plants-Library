import './NavBar.css';

import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar(props) {
    const [isSignOut, setIsSignOut] = useState(false);

    const handleSignOut = () => {
        props.setProfileDetails({});
        props.setIsUserLogedIn(false);
    }

    return (
        <>
            {isSignOut
                ? <Navigate replace to={props.PAGES.current.HOME} />
                : <div className='navbar-div flex-row-center-center'>
                    <Link to={props.PAGES.current.HOME}><button type='button'>Home</button></Link>

                    {props.isUserLogedIn
                        ?
                        <>
                            <Link to={props.PAGES.current.SEARCH}><button type='button'>Search</button></Link>
                            <Link to={props.PAGES.current.MYPLANTS}><button type='button'>My Plants</button></Link>
                            <Link to={props.PAGES.current.PROFILE}><button type='button'>Profile</button></Link>
                            <button type='button' onClick={handleSignOut}>Sign out</button>
                        </>
                        :
                        <>
                            <Link to={props.PAGES.current.REGISTER}><button type='button'>Sign In/Register</button></Link>
                        </>
                    }
                </div>}
        </>
    )
}

export default Navbar;