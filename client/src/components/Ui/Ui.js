import React from "react";
import './Ui.css'
import Button from "../Button/Button";


const Ui=({getusers, addUser})=>{

    return (
        <div>
            ui
            <Button callback={getusers} name='Get Users' />
            <Button callback={addUser} name='Add User' />
        </div>
    )
}

export default Ui