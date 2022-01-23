import React from "react";
import './PopUpWindow.css'
import Button from "../Button/Button";


const PopupWindow = ({title,submit,cancel,handleChange})=> {
    return(<div className='popUp-window'>
        <h2>{title}</h2>
        <div>
            <input onChange={handleChange}
                   type="number"
                   step="5"
                   min="0"
                    placeholder='Amount'

            />
            <Button className='pop-up green' callback={submit} name='Submit' />
            <Button className='pop-up' callback={cancel} name='Cancel' />
        </div>

    </div>)

}
export default PopupWindow