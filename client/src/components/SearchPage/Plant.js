import './Plant.css';
import { Link } from 'react-router-dom';

function Plant({ plant, setMyPlants, myPlants }) {

    const handleAddToMyPlants = (plant) => {
        setMyPlants([...plant, plant])
    }

    return (
        <div className='plant-small'>
            {plant &&
                <>
                    <img src={plant.default_image.thumbnail} alt="Plant" />
                    <p>{plant.common_name}</p>
                    <Link to={`/plant/${plant.id}`}><button className='button-learn_more'>Learn more</button></Link>
                    <button className='button-addToMyPlants' onClick={() => handleAddToMyPlants(plant)}>Add plant</button>
                </>
            }
        </div>
    )
}

export default Plant;