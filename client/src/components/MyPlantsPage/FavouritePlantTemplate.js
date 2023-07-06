import { useEffect, useState } from "react";

import wateringCan from "../../assets/watering_can.png";
import yellowStar from "../../assets/yellow_star.png";
import grayStar from "../../assets/gray_star.png";
import wateredPlant from "../../assets/watered_plant.png";
import notWateredPlant from "../../assets/plant_notwatered.png"

export default function FavouritePlantTemplate(props) {
    const { plant, userID, setIsWateringForm, setEditedPlant, updateProfile } = props;
    const [isFavourite, setIsFavourite] = useState(true);
    const [timeToWater, setTimeToWater] = useState({});

    useEffect(() => {
        if (["wateringFrequency"] in plant) {
            const currentTimeDifference = Math.abs(plant.lastWatering - Date.now());
            const plannedTimeDifference = plant.wateringFrequency * 24 * 60 * 60 * 1000;
            const difference = Math.abs(plannedTimeDifference - currentTimeDifference);
            const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            setTimeToWater(Object.assign(timeToWater, { hours, days }));
            if (currentTimeDifference > plannedTimeDifference) {
                setTimeToWater(Object.assign(timeToWater, { isLate: true }));
            } else {
                setTimeToWater(Object.assign(timeToWater, { isLate: false }));
            }
        }
    }, [])

    const handleRemoveFav = () => {
        setIsFavourite(false);
        fetch("http://localhost:5000/api/plant", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plant, userID })
        })
            .catch(error => console.error(error));
    }

    const handleAddFav = () => {
        setIsFavourite(true);
        fetch("http://localhost:5000/api/plant", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userID,
                plantId: plant.id,
                plant: plant
            })
        })
            .catch(error => console.error(error));
    }

    const handleWateringEvent = async () => {
        try {
            if (["wateringFrequency"] in plant) {
                setTimeToWater(Object.assign(timeToWater, { isLate: false, days: plant.wateringFrequency - 1, hours: 23 }));
                await fetch("http://localhost:5000/api/plant/watering/new", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userID, plantId: plant.id })
                })
                await updateProfile();
            } else {
                setIsWateringForm(true);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="fav-plant-div flex-column-center-center" >
            <div className="fav-image">
                <img className="fav-main-plant" src={plant.default_image.thumbnail} alt="plant" />

            </div>
            <h2>{plant.common_name}</h2>
            <div className="manage-bar flex-row-center-center">
                <img className="manage-icons watering-icon" src={wateringCan} alt="watering can" onClick={handleWateringEvent} />
                <div className="timer flex-row-center-center" onClick={() => {
                    setIsWateringForm(true);
                    setEditedPlant(plant)
                }} >
                    {
                        ["wateringFrequency"] in plant &&
                            timeToWater
                            ?
                            <>
                                <img className="watered-icon" src={timeToWater.isLate ? notWateredPlant : wateredPlant} alt="watered" />
                                <p className={timeToWater.isLate ? "late" : "notlate"}>{timeToWater.days}d {timeToWater.hours}h</p>
                            </>
                            : <p>Add timer</p>
                    }
                </div>
                {
                    isFavourite
                        ? <img className="manage-icons star-on" src={yellowStar} alt="favourite" onClick={handleRemoveFav} />
                        : <img className="manage-icons star-off" src={grayStar} alt="removed favourite" onClick={handleAddFav} />
                }
            </div>
        </div>
    )
}