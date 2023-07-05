import { useState } from "react"

export default function WateringForm({setIsWateringForm, editedPlant, setEditedPlant, userId}){
    const [wateringFrequency, setWateringFrequency] = useState();

    const handleWateringSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/api/plant/watering", {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({userId, editedPlant, wateringFrequency})
        })
        .then(() => {
            setEditedPlant({});
        })
        .catch(error => console.error(error));
        event.target.reset();
        setIsWateringForm(false);
    }

    return(
        <div className="watering-div flex-column-center-center">
            <form className="watering-form flex-column-center-center" onSubmit={handleWateringSubmit}>
                <h2>Set watering reminder</h2>
                <select 
                className="watering-select" 
                name="howOften"
                 id="howOften"
                  defaultValue={0}
                  onChange={(event => setWateringFrequency(event.target.value))}>
                    <option value={0}>Don't remind me</option>
                    {
                        Array.from(Array(30).keys()).map(element => 
                            <option key={"day" + element} value={element + 1}>{element + 1} days</option>)
                    }
                </select>
                <label htmlFor="howOften">How often do you want to water the plant?</label>
                <div className="flex-row-center-center">
                    <button className="confirm-watering-button" type="submit">Confirm</button>
                    <button className="discard-watering-button" type="button" onClick={() => setIsWateringForm(false)}>Discard</button>
                </div>
            </form>
        </div>
    )
}