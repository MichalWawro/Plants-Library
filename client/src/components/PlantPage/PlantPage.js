import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./PlantPage.css";
import PERENUAL_API_KEY from "../../constants/apiKeys";
import wateringCan from "../../assets/watering_can.png";
import cycle from "../../assets/cycle.jpg";
import sun from "../../assets/sun.jpg";

function PlantPage({ userId }) {
    const { id } = useParams();
    const [plant, setPlant] = useState();
    useEffect(() => {
        fetch(`https://perenual.com/api/species/details/${id}?key=${PERENUAL_API_KEY}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.error(error));
    }, [])

    const handleAddToMyPlants = async () => {
        fetch("http://localhost:5000/api/plant", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userId,
                plantId: plant.id,
                plant: plant
            })
        })
            .catch(error => console.error(error));
    }

    return (
        <div className="plant-detail-page">
            {plant &&
                <>
                <img src={plant.default_image.thumbnail} alt="Plant" />
                    <h1>{plant.common_name.toUpperCase()}</h1>
                    
                    
                    <p><b>Scientific Name:</b> {plant.scientific_name}</p>
                    <div className="description-and-icons-container">
                    <div className="description">
                        <p>{plant.description}</p>
                        </div>
                        <div className="icons-container">
                            <div className="watering">
                                <img className="manage-icons watering-icon" src={wateringCan} alt="watering can"></img>
                                <p>{plant.watering}</p>
                            </div>
                            <div className="sun">
                                <img className="manage-icons sun" src={sun} alt="sun"></img>
                                <p>{plant.sunlight}</p>
                            </div>
                            <div className="cycle">
                                <img className="manage-icons cycle" src={cycle} alt="cycle"></img>
                                <p>{plant.cycle}</p>
                            </div>
                        </div>
                        
                    </div>
                    <button className="add-button" onClick={handleAddToMyPlants}>Add plant</button>
                </>
            }
        </div>
    );
}

export default PlantPage;