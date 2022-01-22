import React, {useState} from "react";
import './Ui.css'
import Button from "../Button/Button";


const Ui=({getusers, addUser,findUser})=>{
        const[passId,setPassId]=useState(Number)

    const handleSearchChange=(e)=>{
            setPassId(e.target.value)
    }
    return (
        <div>
            ui
            <Button callback={getusers} name='Get Users' />
            <Button callback={addUser} name='Add User' />
            {/*<Button callback={findUser} name='Find User' />*/}
            <label htmlFor="findUser">passId</label>
            <input onChange={handleSearchChange} type="text" name="findUser" value={passId}/>
            <button onClick={()=>findUser(passId)} > Find</button>
        </div>
    )
}

export default Ui