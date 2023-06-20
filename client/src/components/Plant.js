import './Plant.css';

function Plant({plant, setMyPlants}) {

    const handleClick = () =>{
    console.log("działa guzik")
    }

    const handleAddToMyPlants =(plant)=>{
        setMyPlants([...plant, plant])
    }

    return(
        <div className='plant-small'>
           <img src={plant.default_image.thumbnail} />
           <p>{plant.common_name}</p>
           <button className='button-learn_more' onClick={() => handleClick}>Learn more</button>
           <button className='button-addToMyPlants' onClick={() => handleAddToMyPlants(plant)}>Learn more</button>
        </div>
    )
}

export default Plant;