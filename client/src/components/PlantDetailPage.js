import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlantDetailPage() {
    const { plantId } = useParams();
    const [plant, setPlant] = useState();

    useEffect(()=> {
        const fetchPlantDetails = async () => {
            try {
                const plantData = await getPlantDetails(plantId);
                setPlant(plantData);
            } catch (error) {
                console.log('Error', error);
            }
        };

        fetchPlantDetails();
    }, [plantId]);

    return (
        <div className="plant-detail-page">
            <h1>{plant.common_name}</h1>
            <img src={plant.default_image}/>
            <p>Scientific Name: {plant.scientific_name}</p>
            <p>Watering: {plant.watering}</p>
            <p>Sunlight: {plant.sunlight}</p>
            <p>Cycle: {plant.cycle}</p>
            <button>Add to My Plants</button>
        </div>
    );
}

export default PlantDetailPage;
