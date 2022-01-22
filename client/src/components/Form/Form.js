import React from "react";
import './Form.css'
import Button from "../Button/Button";


const Form=({submit,submitEdit,cancel,handleInputs,newUser,title})=> {

    return (<div className='form'>
        <h3>{title}</h3>
        <div className='inputs-div'></div>
        <div>
            <label htmlFor="name">Name</label>
            <input onChange={handleInputs} type="text" name='name' defaultValue={newUser.name}/>
        </div>
        {title === 'Add User'
            ? <div>
                <label htmlFor="name">PassId</label>
                <input onChange={handleInputs} type="number" name='passId' defaultValue={newUser.passId}/>
            </div>
            : <span></span>
        }
        <div>
            <label htmlFor="passId">Cash</label>
            <input onChange={handleInputs} type="number" name='cash' defaultValue={newUser.cash}/>
        </div>
       <div>
           <label htmlFor="credit">Credit</label>
           <input onChange={handleInputs} type="number" name='credit' defaultValue={newUser.credit}/>
       </div>
        <div>
            <label htmlFor="isActive">Active</label>
            <input onChange={handleInputs} type="checkbox" name='isActive' defaultValue={newUser.isActive} />
        </div>
        <div>
            {title==='Add User'
                ? <Button callback={submit} name='Submit' />
                :<Button callback={submitEdit} name='Submit' />
            }
            <Button callback={cancel} name='Cancel' />
        </div>


    </div>)
}
export default Form