import './NavBar.css';
import { Link } from 'react-router-dom';

function Navbar({ PAGES, isUserLogedIn }) {
    return (
        <>
            <Link to={PAGES.current.HOME}><button type='button'>Home</button></Link>
            <Link to={PAGES.current.SEARCH}><button type='button'>Search</button></Link>
            {!isUserLogedIn
                ?
                <>
                    <Link to={PAGES.current.MYPLANTS}><button type='button'>My Plants</button></Link>
                    <Link to={PAGES.current.PROFILE}><button type='button'>Profile</button></Link>
                </>
                :
                <>
                    <Link to={PAGES.current.REGISTER}><button type='button'>Sign Up</button></Link>
                    <Link to={PAGES.current.LOGIN}><button type='button'>Register</button></Link>
                </>
            }
        </>
    )
}

export default Navbar;