import React, { useContext } from "react";
import NavigationControls from "../NavigacionControls/NavigationControls";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import { useAuth } from "../contexts/Auth";

function Home() {
    const contextAuth = useAuth();
    console.log(contextAuth)
    return (
        <div >            
            <img src="https://res.cloudinary.com/mielproject/image/upload/v1594116517/r2fp626p5wiuwy10d9sz.jpg" alt="Apicultor"></img>
        </div >);

}

export default Home;