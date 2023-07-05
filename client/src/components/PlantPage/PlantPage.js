import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./PlantPage.css";
import PERENUAL_API_KEY from "../../constants/apiKeys";

function PlantPage({userId}) {
    const { id } = useParams();
    const [plant, setPlant] = useState();
    console.log(userId);
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
                    <h1>{plant.common_name}</h1>
                    <img src={plant.default_image.thumbnail} alt="Plant" />
                    <p>Scientific Name: {plant.scientific_name}</p>
                    <p>Watering: {plant.watering}</p>
                    <p>Sunlight: {plant.sunlight}</p>
                    <p>Cycle: {plant.cycle}</p>
                    <button onClick={handleAddToMyPlants}>Add plant</button>
                </>
            }
        </div>
    );
}

export default PlantPage;