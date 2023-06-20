import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlantDetailPage() {

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
