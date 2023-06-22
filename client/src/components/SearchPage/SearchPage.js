import './SearchPage.css';
import React, { useState, useEffect } from 'react';
import Plant from './Plant';
const key = "sk-06pe64918b89a19c41346"


function Searchpage({profileDetails}) {

    const [allPlants, setAllPlants] = useState(null);
    const [foundPlants, setFoundPlants] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://perenual.com/api/species-list?page=1&key=${key}`);
            const data = await response.json();
            setAllPlants(data);
        };

        fetchData().catch(error => console.error(`Error fetching data:${error}`));
    }, []);


    const handleChange = (event) => {
        const searchValue = event.target.value
        const plantsSearched = allPlants.data.filter(plants =>
            plants.common_name.toLowerCase().includes(searchValue.toLowerCase()))
        setFoundPlants(plantsSearched)
    }

    return (
        <div>
            <form>
                {allPlants && <input placeholder="Choose a plant..." onChange={handleChange}></input>}
            </form>
            <div className='container-plants'>
                {foundPlants &&
                    foundPlants.map((plant, index) =>
                        <Plant key={"plant" + index} plant={plant} profileDetails={profileDetails}/>)
                }
            </div>
        </div>
    )
}

export default Searchpage;