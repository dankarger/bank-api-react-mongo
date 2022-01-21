import React from "react";
import './Ui.css'
import Button from "../Button/Button";


const Ui=({getusers, addUser,findUser})=>{

    return (
        <div>
            ui
            <Button callback={getusers} name='Get Users' />
            <Button callback={addUser} name='Add User' />
            <Button callback={findUser} name='Find User' />
        </div>
    )
}

export default Ui