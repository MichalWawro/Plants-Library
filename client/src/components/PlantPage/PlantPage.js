import { useParams } from "react-router-dom";
import "./PlantPage.css";
import { useEffect, useState } from "react";

function PlantPage() {
    const { id } = useParams();
    const [plantData, setPlantData] = useState();

    useEffect(() => {
        const getPlantData = async () => {
            const response = await fetch(`https://perenual.com/api/species/details/${id}?key=sk-hzSZ64901d28d747a1330`);
            const data = response.json();
            setPlantData(data);
        } 
        getPlantData();
    }, [])
    

    return(
        <h2>{id}</h2>
    )
}

export default PlantPage;