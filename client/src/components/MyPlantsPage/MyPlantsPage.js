import { useEffect } from "react";
import "./MyPlantsPage.css";

import wateringCan from "../../assets/watering_can.png";
import yellowStar from "../../assets/yellow_star.png";
import grayStar from "../../assets/gray_star.png";

function MyPlantsPage({ profileDetails, setProfileDetails }) {
    

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


    const handleRemoveFromFav = () => {

    }

    return (
        <>
            <h1>My Plants</h1>
            <div className="fav-container flex-row-center-center">
                {profileDetails && profileDetails[0].plants.map((element, index) =>
                    <div className="flex-column-center-center" key={"fav" + index}>
                        <img src={element.default_image.thumbnail} alt="plant" />
                        <h2>{element.common_name}</h2>
                        <div className="manage-bar flex-row-center-center">
                            <img className="manage-icons watering-icon" src={wateringCan} alt="watering can"/>
                            <img className="manage-icons star-on" src={yellowStar} alt="favourite" onClick={handleRemoveFromFav}/>
                            <img className="manage-icons star-off" src={grayStar} alt="removed favourite" onClick={handleRemoveFromFav}/>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MyPlantsPage;