import React from "react";
import './Form.css'
import Button from "../Button/Button";


const Form=({submit,submitEdit,cancel,handleInputs,newUser,title})=> {

    return (<div className='form'>
        <h2><u>{title}</u></h2>
        <div className='inputs-div'></div>
        <div className='input'>
            <label htmlFor="name">Name</label>
            <input onChange={handleInputs} type="text" name='name' defaultValue={newUser.name}/>
        </div>
        {title === 'Add User'
            ? <div className='input'>
                <label htmlFor="name">PassId</label>
                <input onChange={handleInputs} type="number" name='passId' defaultValue={newUser.passId}/>
            </div>
            : <span></span>
        }
        <div className='input'>
            <label htmlFor="passId">Cash</label>
            <input onChange={handleInputs} type="number" name='cash' defaultValue={newUser.cash}/>
        </div>
       <div className='input'>
           <label htmlFor="credit">Credit</label>
           <input onChange={handleInputs} type="number" name='credit' defaultValue={newUser.credit}/>
       </div>
        <div className='input'>
            <label htmlFor="isActive">Active</label>
            <input onChange={handleInputs} type="checkbox" name='isActive' defaultValue={newUser.isActive} />
        </div>
        <div className='buttons-add'>
            {title==='Add User'
                ? <Button className={"add-user"} callback={submit} name='Submit' />
                :<Button className={"add-user"} callback={submitEdit} name='Submit' />
            }
            <Button className={"add-user"} callback={cancel} name='Cancel' />
        </div>


    </div>)
}
export default Form