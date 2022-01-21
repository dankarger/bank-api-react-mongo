import React from "react";
import './Form.css'
import Button from "../Button/Button";


const Form=()=> {

    return (<div className='form'>
        <h3>Add User</h3>
        <div className='inputs-div'></div>

        <label htmlFor="name">Name</label>
        <input type="text" name='name'/>
        <label htmlFor="name">PassId</label>
        <input type="number" name='passId'/>
        <label htmlFor="passId">Cash</label>
        <input type="number" name='cash'/>
        <label htmlFor="credit">Credit</label>
        <input type="number" name='credit'/>
    </div>)
}
export default Form