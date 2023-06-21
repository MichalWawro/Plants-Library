import { Link } from 'react-router-dom';

import './NavBar.css';

function Navbar({ PAGES, isUserLogedIn }) {
    return (
        <div className='navbar-div flex-row-center-center'>
            <Link to={PAGES.current.HOME}><button type='button'>Home</button></Link>
            <Link to={PAGES.current.SEARCH}><button type='button'>Search</button></Link>
            {isUserLogedIn
                ?
                <>
                    <Link to={PAGES.current.MYPLANTS}><button type='button'>My Plants</button></Link>
                    <Link to={PAGES.current.PROFILE}><button type='button'>Profile</button></Link>
                </>
                :
                <>
                    <Link to={PAGES.current.REGISTER}><button type='button'>Sign In/Register</button></Link>
                </>
            }
        </div>
    )
}

export default Navbar;