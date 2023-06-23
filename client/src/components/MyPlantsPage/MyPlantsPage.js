import { useEffect } from "react";
import "./MyPlantsPage.css"

function MyPlantsPage({ profileDetails, setProfileDetails }) {

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:5000/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: profileDetails[0].userId })
            })
            const data = await response.json();
            setProfileDetails(data);
        })();
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