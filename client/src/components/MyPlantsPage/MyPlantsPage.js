import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyPlantsPage.css";

import FavouritePlantTemplate from "./FavouritePlantTemplate";
import WateringForm from "./WateringForm";

import firstPlant from "../../assets/firstplant.png";

import PAGES from "../../constants/enums";

function MyPlantsPage({ profileDetails, setProfileDetails }) {
    const [isWateringForm, setIsWateringForm] = useState(false);
    const [editedPlant, setEditedPlant] = useState({});

    useEffect(() => {
        updateProfile();
    }, [])

    const updateProfile = () => {
        fetch("http://localhost:5000/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: profileDetails[0].userId })
        })
            .then(response => response.json())
            .then(data => setProfileDetails(data))
            .catch(error => console.error(error));
    }

    return (
        <>
            {
                profileDetails[0].plants.length > 0
                    ?
                    <>
                        {isWateringForm && <WateringForm
                            setIsWateringForm={setIsWateringForm}
                            userId={profileDetails[0].userId}
                            editedPlant={editedPlant}
                            setEditedPlant={setEditedPlant}
                            updateProfile={updateProfile} />}
                        <p className="fav-plants-header">My Plants</p>
                        <div className="fav-container flex-row-center-center">

                            {profileDetails && profileDetails[0].plants.map((element, index) =>
                                <FavouritePlantTemplate
                                    key={"fav" + index}
                                    plant={element}
                                    userID={profileDetails[0].userId}
                                    setIsWateringForm={setIsWateringForm}
                                    setEditedPlant={setEditedPlant}
                                    updateProfile={updateProfile} />
                            )}
                        </div>
                    </>
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

export default MyPlantsPage;