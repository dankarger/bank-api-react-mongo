import React from "react";
import './Form.css'
import Button from "../Button/Button";


const Form=({submit,cancel,handleInputs,newUser})=> {

    return (<div className='form'>
        <h3>Add User</h3>
        <div className='inputs-div'></div>
        <div>
            <label htmlFor="name">Name</label>
            <input onChange={handleInputs} type="text" name='name'/>
        </div>

        <div>
            <label htmlFor="name">PassId</label>
            <input onChange={handleInputs} type="number" name='passId'/>
        </div>
        <div>
            <label htmlFor="passId">Cash</label>
            <input onChange={handleInputs} type="number" name='cash'/>
        </div>
       <div>
           <label htmlFor="credit">Credit</label>
           <input onChange={handleInputs} type="number" name='credit'/>
       </div>
        <div>
            <label htmlFor="isActive">Active</label>
            <input onChange={handleInputs} type="checkbox" name='isActive' value={newUser.isActive} />
        </div>
        <div>
            <Button callback={submit} name='Submit' />
            <Button callback={cancel} name='Cancel' />
        </div>


    </div>)
}
export default Form