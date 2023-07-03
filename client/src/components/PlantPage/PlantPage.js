import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./PlantPage.css";
import PERENUAL_API_KEY from "../../constants/apiKeys";

function PlantPage() {
    const { id } = useParams();
    const [plant, setPlant] = useState();

    useEffect(() => {
        fetch(`https://perenual.com/api/species/details/${id}?key=${PERENUAL_API_KEY}`)
        .then(response => response.json())
        .then(data => setPlant(data))
        .catch(error => console.error(error));
    }, [])


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
                    <button>Add to My Plants</button>
                </>
            }
        </div>
    );
}

export default PlantPage;