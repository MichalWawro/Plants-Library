import './Plant.css';
import { Link } from 'react-router-dom';

function Plant({ plant, profileDetails }) {

  const handleAddToMyPlants = async () => {
    await fetch("http://localhost:5000/api/plant", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: profileDetails[0].userId,
        plantId: plant.id,
        plant: plant
      })
    })
  }

  return (
    <div className='plant-small'>
      {plant &&
        <>
        <a href ={`/plant/${plant.id}`}>
          <img src={plant.default_image.thumbnail} alt="Plant" /> </a>
          <p>{plant.common_name}</p>
          <Link to={`/plant/${plant.id}`}><button className='button-learn_more'>Learn more</button></Link>
          <button className='button-addToMyPlants' onClick={handleAddToMyPlants}>Add plant</button>
        </>
      }
    </div>
  )
}

export default Plant;