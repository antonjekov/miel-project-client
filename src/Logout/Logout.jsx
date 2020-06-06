import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import userService from "../services/user_service";

function Logout(props) {
    userService.logout().then(res => {
        if (!res.ok) {
            throw new Error();
        }
    }).catch(console.error) //TO DO Must return Server Error Page in catch

    return <Redirect to='/' />
}

export default Logout