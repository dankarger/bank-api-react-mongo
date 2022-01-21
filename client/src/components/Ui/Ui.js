import React from "react";
import './Ui.css'
import Button from "../Button/Button";


const Ui=({getusers})=>{

    return (
        <div>
            ui
            <Button callback={getusers} name='Get Users' />
        </div>
    )
}

export default Ui