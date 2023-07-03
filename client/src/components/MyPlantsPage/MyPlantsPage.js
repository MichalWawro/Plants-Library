import { useEffect } from "react";
import "./MyPlantsPage.css"

function MyPlantsPage({ profileDetails, setProfileDetails }) {

    useEffect(() => {
        fetch("http://localhost:5000/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: profileDetails[0].userId })
        })
        .then(response => response.json())
        .then(data => setProfileDetails(data))
        .catch(error => console.error(error));
    }, [])

    return (
        <>
            <h1>My Plants</h1>
            <div className="fav-container flex-row-center-center">
                {profileDetails && profileDetails[0].plants.map((element, index) =>
                    <div className="flex-column-center-center" key={"fav" + index}>
                        <img src={element.default_image.thumbnail} alt="plant" />
                        <h2>{element.common_name}</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default MyPlantsPage;