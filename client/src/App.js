// import { useState } from 'react';
import myApi from './api/Api';
import {useEffect, useState} from "react";
import Ui from "./components/Ui/Ui";
import Button from "./components/Button/Button";
import './App.css'
import Form from "./components/Form/Form";

function App() {
    // const [user, setUser] = useState('');
    const [users, setUsers] = useState([]);
    const [isDataOpen, setIsDataOpen] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newUser,setNewUser] = useState({})
    const[errorMessage,setErrorMessage] =useState('')
    console.log(process.env.NODE_ENV);

    useEffect(()=>{
        setUsers(getReq());
    },[])
    // useEffect(()=>{
    //
    // },[users])

    const getReq = async () => {
        setErrorMessage('')
        try {
            const {data} = await myApi.get('/users/get-users')
            console.log('data', data)
            setUsers(data)
            setIsDataOpen(!isDataOpen)
        }catch(e) {
            console.log(e.message);
            setErrorMessage(e.message)
        }
    };
    const addUser=async ()=>{
            setIsFormOpen(!isFormOpen);
    }
    const handleSubmitFormAddUser = async ()=>{
        setErrorMessage('')
        try{
            console.log('new',newUser)
            const {passId,name,cash,credit} = newUser

            const {data} = await myApi.post('/users/add-user',
                {name:newUser.name,
                    passId:newUser.passId,
                    cash:newUser.cash,
                    credit:newUser.credit,
                isActive:newUser.isActive===true?"true":"false"})
            setIsFormOpen(!isFormOpen)

        }catch (e) {
            console.log(e.message);
            setErrorMessage(e.message)
        }
    }
    const handleCancelForm=()=> {
        setIsFormOpen(!isFormOpen)
    }

    const handleDeleteUser = async (id) => {
        // setErrorMessage('')
        try {
            console.log('id',id)
             const user = await myApi.delete(`/users/delete-user/${id}`)
            console.log('1',user)
            setUsers(getReq());
            setIsDataOpen(true)
        } catch (e) {
            console.log(e)
            setErrorMessage(e.message)
        }
    }

    const showUsers = () => {
        if (isDataOpen) {
            if (users.length > 0) {
                return users.map(user => {
                    return (
                        <div className='card' key={user._id}>
                            <h3>Name: <span>{user.name}</span> </h3>
                            <h4>Pass ID: <span>{user.passId}</span></h4>
                            <h4>Cash: <span>{user.cash}</span></h4>
                            <h4>Credit: <span>{user.credit}</span></h4>
                            <h4>Active: <span>{user.isActive}</span></h4>
                            <Button name="Delete" callback={()=>handleDeleteUser(user._id)} />
                            <Button name="Edit"  />

                        </div>)
                })
            }
        }
    }

    const handleFormInputs = (e)=>{
        console.log(e.target.name,e.target.value);
        let newObjectUser = newUser
        newObjectUser[e.target.name]=e.target.value
        // setNewUser({...[],[e.target.name]:e.target.value});
        setNewUser(newObjectUser)
        console.log('n',newUser)

    }
    const handleFindUser = () => {

    }
    const showForm=()=> {
         if(isFormOpen){
             return(
                 <div>
                     <Form submit={handleSubmitFormAddUser} cancel={handleCancelForm} handleInputs={handleFormInputs} newUser={newUser}/>
                 </div>
             )
         }
    }
    return (
        <div className='App'>
            <h1> Hello Master Bank Manager</h1>
            <h2>Users: {users.length}</h2>
            <div>
            </div>
            {/*<button onClick={() => getReq()}>get</button>*/}
            <Ui getusers={getReq} addUser={addUser} findUser={handleFindUser}/>
            <div>
                {showUsers()}
                {showForm()}
            </div>
        </div>
    );
}

export default App;
