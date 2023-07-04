import { useState } from "react";

import wateringCan from "../../assets/watering_can.png";
import yellowStar from "../../assets/yellow_star.png";
import grayStar from "../../assets/gray_star.png";

export default function FavouritePlantTemplate({ plant, userID, setIsWateringForm, setEditedPlant }) {
    const [isFavourite, setIsFavourite] = useState(true);

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
    }

    return (
        <div className="flex-column-center-center" >
            <img src={plant.default_image.thumbnail} alt="plant" />
            <h2>{plant.common_name}</h2>
            <div className="manage-bar flex-row-center-center">
                <img className="manage-icons watering-icon" src={wateringCan} alt="watering can"
                    onClick={() => {
                        setIsWateringForm(true);
                        setEditedPlant(plant)
                    }} />
                {
                    isFavourite
                        ? <img className="manage-icons star-on" src={yellowStar} alt="favourite" onClick={handleRemoveFav} />
                        : <img className="manage-icons star-off" src={grayStar} alt="removed favourite" onClick={handleAddFav} />
                }
            </div>
        </div>
    )
}