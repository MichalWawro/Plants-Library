import { Link } from 'react-router-dom';

import './NavBar.css';

function Navbar(props) {

    const handleSignOut = () => {
        props.setProfileDetails({});
        props.setIsUserLogedIn(false);
    }

    return (
        <div className='navbar-div flex-row-center-center'>
            <Link to={props.PAGES.current.HOME}><button type='button'>Home</button></Link>
            <Link to={props.PAGES.current.SEARCH}><button type='button'>Search</button></Link>
            {props.isUserLogedIn
                ?
                <>
                    <Link to={props.PAGES.current.MYPLANTS}><button type='button'>My Plants</button></Link>
                    <Link to={props.PAGES.current.PROFILE}><button type='button'>Profile</button></Link>
                    <button type='button' onClick={handleSignOut}>Sign out</button>
                </>
                :
                <>
                    <Link to={props.PAGES.current.REGISTER}><button type='button'>Sign In/Register</button></Link>
                </>
            }
        </div>
    )
}

export default Navbar;