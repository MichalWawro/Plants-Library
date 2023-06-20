import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./PlantPage.css";

function PlantPage() {
    const { id } = useParams();
    const [plant, setPlant] = useState();

    useEffect(() => {
        const getPlantData = async () => {
            const response = await fetch(`https://perenual.com/api/species/details/${id}?key=sk-hzSZ64901d28d747a1330`);
            const data = await response.json();
            setPlant(data);
        }
        getPlantData();
    }, [])


    return (
        <div className="plant-detail-page">
            {plant &&
                <>
                    <h1>{plant.common_name}</h1>
                    <img src={plant.default_image} alt="Plant" />
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