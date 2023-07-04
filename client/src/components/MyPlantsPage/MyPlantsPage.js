import { useEffect, useState } from "react";
import "./MyPlantsPage.css";

import FavouritePlantTemplate from "./FavouritePlantTemplate";
import WateringForm from "./WateringForm";

function MyPlantsPage({ profileDetails, setProfileDetails }) {
    const [isWateringForm, setIsWateringForm] = useState(false);
    const [editedPlant, setEditedPlant] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: profileDetails[0].userId })
        })
            .then(response => response.json())
            .then(data => setProfileDetails(data))
            .catch(error => console.error(error));
    }, [])

    return (
        <>
            {isWateringForm && <WateringForm
                setIsWateringForm={setIsWateringForm}
                userId={profileDetails[0].userId}
                editedPlant={editedPlant}
                setEditedPlant={setEditedPlant} />}
            <h1>My Plants</h1>
            <div className="fav-container flex-row-center-center">

                {profileDetails && profileDetails[0].plants.map((element, index) =>
                    <FavouritePlantTemplate
                        key={"fav" + index}
                        plant={element}
                        userID={profileDetails[0].userId}
                        setIsWateringForm={setIsWateringForm}
                        setEditedPlant={setEditedPlant} />
                )}
            </div>
        </>
    )
}

export default MyPlantsPage;