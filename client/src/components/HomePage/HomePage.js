import './HomePage.css';

//components
import HomePageLoggedIn from './HomePageLoggedIn';
import HomePageLoggedOut from './HomePageLoggedOut';

function HomePage({isUserLogedIn, profileDetails}) {
    return(
        <>
            {isUserLogedIn 
            ? <HomePageLoggedIn profileDetails={profileDetails}/>
            : <HomePageLoggedOut/>
            }
        </>
    )
}

export default HomePage;