import React from "react";
import './PopUpWindow.css'
import Button from "../Button/Button";


const PopupWindow = ({title,submit,cancel,handleChange})=> {
    return(<div className='pop-up'>
        {title}
        <div>
            <input onChange={handleChange} type="number"/>
            <Button callback={submit} name='Submit' />
            <Button callback={cancel} name='Cancel' />
        </div>

    </div>)

}
export default PopupWindow