import React, { useState, useEffect } from 'react';

import './SearchPage.css';
import PERENUAL_API_KEY from '../../constants/apiKeys';
import Plant from './Plant';

function Searchpage({profileDetails}) {

    const [allPlants, setAllPlants] = useState(null);
    const [foundPlants, setFoundPlants] = useState(null)


    useEffect(() => {
        try {
            (async () => {
                const response = await fetch(`https://perenual.com/api/species-list?page=1&key=${PERENUAL_API_KEY}`);
                const data = await response.json();
                setAllPlants(data);
            })();
        } catch (error) {
            console.error(`Error fetching data:${error}`)
        }
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