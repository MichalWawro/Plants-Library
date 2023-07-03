import { Link } from "react-router-dom";

import firstPlant from "../../assets/firstplant.png";
import PAGES from "../../constants/enums";

function HomePageLoggedIn({ profileDetails}) {

    return (
        <>
            <h1>Hello {profileDetails[0].userName}!</h1>
            {
                profileDetails[0].plants.length > 0
                    ? <h1>SOON</h1>
                    : <>
                        <h1>It seem's that You don't have any plants yet</h1>
                        <Link to={PAGES.SEARCH} style={{ textDecoration: 'none' }}>
                            <div className="add-first-plant-div flex-row-center-center">
                                <img className="add-plant-image" src={firstPlant} alt="plant" />
                                <div className="add-plant-div">Add first plant</div>
                            </div>
                        </Link>
                    </>
            }
        </>
    )
}

export default HomePageLoggedIn;