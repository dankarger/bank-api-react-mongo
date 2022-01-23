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
            {/*<Button className={'button-ui'} callback={getusers} name='Get Users' />*/}
            <Button className={'button-ui'} callback={addUser} name='Add User' />
            <div className="search-bar">
                 <label htmlFor="findUser">search (Enter passport ID)</label>
                <div className='search-button'>
                        <input onChange={handleSearchChange}
                               type="number"
                               name="findUser"
                               value={passId}
                               placeholder='test'
                               min="0" />

                    <button className={'button-ui search'} onClick={()=>findUser(passId)} > Search</button>
                </div>
            </div>
        </div>
    )
}

export default Ui