import './NavBar.css';
import { Link } from 'react-router-dom';

function Navbar({PAGES}) {
    return(
        <>
            <Link to={PAGES.current.HOME}><button>Home</button></Link>
            <Link to={PAGES.current.SEARCH}><button>Search</button></Link>
            <Link to={PAGES.current.MYPLANTS}><button>My Plants</button></Link>
            <Link to={PAGES.current.PROFILE}><button>Profile</button></Link>
        </>
    )
}

export default Navbar;