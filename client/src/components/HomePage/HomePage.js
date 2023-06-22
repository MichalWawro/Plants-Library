import './HomePage.css';

//components
import HomePageLoggedIn from './HomePageLoggedIn';
import HomePageLoggedOut from './HomePageLoggedOut';

function HomePage({isUserLogedIn, profileDetails, PAGES }) {
    return(
        <>
            {isUserLogedIn 
            ? <HomePageLoggedIn profileDetails={profileDetails} PAGES={PAGES}/>
            : <HomePageLoggedOut/>
            }
        </>
    )
}

export default HomePage;