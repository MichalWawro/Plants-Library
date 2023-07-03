import './SearchPage.css';
import React, { useState, useEffect } from 'react';
import Plant from './Plant';
const key = "sk-hzSZ64901d28d747a1330"


function Searchpage({profileDetails}) {

    const [allPlants, setAllPlants] = useState(null);
    const [foundPlants, setFoundPlants] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://perenual.com/api/species-list?page=15&key=${key}`);
            const data = await response.json();
            setAllPlants(data);
        };

        fetchData()
        
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
                {allPlants && <input className="search-input" placeholder="Search a plant..." onChange={handleChange}></input>}
            </form>
            <div className='container-plants'>
                {foundPlants? 
                   (foundPlants.map((plant, index) =>
                        <Plant key={"plant" + index} plant={plant} profileDetails={profileDetails}/>)) : ((allPlants)&& allPlants.data.map((plant, index) =>
                        <Plant key={"plant" + index} plant={plant} profileDetails={profileDetails} />))
                }
            </div>
        </div>
    )
}

export default Searchpage;