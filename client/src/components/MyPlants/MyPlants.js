import './MyPlants.css';
import React, { useState, useEffect } from 'react';
import Plant from '../SearchPage/Plant';
const key = "sk-06pe64918b89a19c41346"

function MyPlants({ setMyPlants, myPlants }) {
    const [allPlants, setAllPlants] = useState(null);
    const [foundPlants, setFoundPlants] = useState([]);
    const myPlantsArray = ['White Fir', 'Snakebark Maple', "Kelly's Gold Boxelder"];

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://perenual.com/api/species-list?page=1&key=${key}`);
            const data = await response.json();
            setAllPlants(data);
        };

        fetchData().catch(error => console.error(`Error fetching data:${error}`));
    }, []);

    useEffect(() => {
        const findMyPlants = () => {
            if (allPlants && allPlants.data) {
                const plantsSearched = allPlants.data.filter((plant) =>
                    myPlantsArray.includes(plant.common_name)
                );
                setFoundPlants(plantsSearched);
            }
        };

        findMyPlants();
    }, [allPlants]);

    return (
        <div className='container-plants'>
            {foundPlants.length !== 0 ? (
                foundPlants.map((plant, index) => (
                    <Plant key={"plant" + index} plant={plant} setMyPlants={setMyPlants} myPlants={myPlants} />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default MyPlants;