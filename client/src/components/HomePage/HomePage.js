import './HomePage.css';

//components
import HomePageLoggedIn from './HomePageLoggedIn';
import HomePageLoggedOut from './HomePageLoggedOut';

function HomePage({isUserLogedIn}) {
    return(
        <>
            {isUserLogedIn 
            ? <HomePageLoggedIn/>
            : <HomePageLoggedOut/>
            }
        </>
    )
}

export default HomePage;