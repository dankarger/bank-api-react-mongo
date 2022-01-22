import React, {useState} from "react";
import './Ui.css'
import Button from "../Button/Button";


const Ui=({getusers, addUser,findUser})=>{
        const[passId,setPassId]=useState(1)

    const handleSearchChange=(e)=>{
            setPassId(e.target.value)
    }
    return (
        <div className="ui">

            <Button className={'button-ui'} callback={getusers} name='Get Users' />
            <Button className={'button-ui'} callback={addUser} name='Add User' />
            {/*<Button callback={findUser} name='Find User' />*/}
            <label htmlFor="findUser">search</label>
            <input onChange={handleSearchChange}
                   type="number"
                   name="findUser"
                   value={passId}
                   placeholder='test'
                   min="0" />
            <button className={'button-ui'} onClick={()=>findUser(passId)} > Find</button>
        </div>
    )
}

export default Ui