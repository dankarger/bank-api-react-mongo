// import { useState } from 'react';
import myApi from './api/Api';
import {useEffect, useState} from "react";
import Ui from "./components/Ui/Ui";
import Button from "./components/Button/Button";
import './App.css'
import Form from "./components/Form/Form";
import PopupWindow from "./components/PopUpWindow/PopupWindow";

function App() {
    // const [user, setUser] = useState('');
    const [users, setUsers] = useState([]);
    const [isDataOpen, setIsDataOpen] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditFormOpen, setEditIsFormOpen] = useState(false);
    const [isFindUserOpen, setIsFindUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({});
    const[withDrawAmount,setWithDrawAmount]=useState(Number);
    const [findUser, setFindUser] = useState({});
    const[isPopUpWindow,setIsPopUpWindow]=useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    console.log(process.env.NODE_ENV);

    useEffect(() => {
        setUsers(getReq());
    }, [])


    //Handle Functions
    const getReq = async () => {
        setErrorMessage('')
        try {
            const {data} = await myApi.get('/users/get-users')
            console.log('data', data)
            setUsers(data)
            setIsDataOpen(!isDataOpen)
        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.message)
        }
    };
    const addUser = async () => {
        setIsFormOpen(!isFormOpen);
    }


    const handleSubmitFormAddUser = async () => {
        setErrorMessage('')
        try {
            console.log('new', newUser)
            const {passId, name, cash, credit} = newUser

            const {data} = await myApi.post('/users/add-user',
                {
                    name: newUser.name,
                    passId: newUser.passId,
                    cash: newUser.cash,
                    credit: newUser.credit,
                    isActive: newUser.isActive === true ? "true" : "false"
                })
            setIsFormOpen(!isFormOpen)

        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.message)
        }
    }

    const handleSubmitFormEditUser = async () => {
        setErrorMessage('')
        try {
            const {data} = await myApi.post('/users/edit-user',
                {
                    name: newUser.name,
                    cash: newUser.cash,
                    credit: newUser.credit,
                    isActive: newUser.isActive === true ? "true" : "false"
                })
            setIsFormOpen(!isFormOpen)

        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.message)
        }
    }

    const handleCancelForm = () => {
        setIsFormOpen(false)
        setEditIsFormOpen(false)
    }

    const handleDeleteUser = async (id) => {
        // setErrorMessage('')
        try {
            console.log('id', id)
            const user = await myApi.delete(`/users/delete-user/${id}`)
            console.log('1', user)
            setUsers(getReq());
            setIsDataOpen(true)
        } catch (e) {
            console.log(e)
            setErrorMessage(e.message)
        }
    }

    const handleFormInputs = (e) => {
        console.log(e.target.name, e.target.value);
        let newObjectUser = newUser
        newObjectUser[e.target.name] = e.target.value
        // setNewUser({...[],[e.target.name]:e.target.value});
        setNewUser(newObjectUser)
        console.log('n', newUser)
    }
    const handleFindUser = async (passId) => {
        try {
            const {data} = await myApi.get(`/users/get-user/${passId}`)
            setFindUser(data)
            console.log('g', data)
            // setIsDataOpen(false)
            setIsFindUserOpen(true)
            return data

        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.message)
        }
    }
    const handleEditUser = async (passId) => {
        console.log('passId',passId)
        const user= await handleFindUser(passId);
        setNewUser(user)
        console.log('edit',newUser)
        setEditIsFormOpen(true);
    }

    const handleWithdraw =(passId, amount) => {
        setIsPopUpWindow(!isPopUpWindow);

    }
    const handleChaneWithDraw = (e)=>{
        setWithDrawAmount(e.target.value)
    }
    const showPopUp=()=>{
        if(isPopUpWindow) {
            return <PopupWindow title='Withdraw'
                                cancel={()=>setIsPopUpWindow(false)}
                                handleChange={handleChaneWithDraw}
                                />
        }
    }
    const handleDeposit =() => {

    }
    //Show Functions

    const showUsers = () => {
        if (isDataOpen) {
            if (users.length > 0) {
                return users.map(user => {
                    return (
                        <div className='card' key={user._id}>
                            <h3>Name: <span>{user.name}</span></h3>
                            <h4>Pass ID: <span>{user.passId}</span></h4>
                            <h4>Cash: <span>{user.cash}</span></h4>
                            <h4>Credit: <span>{user.credit}</span></h4>
                            <h4>Active: <span>{user.isActive}</span></h4>
                            <Button name="Delete" callback={() => handleDeleteUser(user._id)}/>
                            <Button name="Edit" callback={() => handleEditUser(user.passId)}/>
                            <Button name="Withdraw" callback={() => handleWithdraw(user.passId)}/>
                            <Button name="Deposit" callback={() => handleDeposit(user.passId)}/>
                            {/*<Button name="Add Credit" callback={() => handleEditUser(user.passId)}/>*/}
                            {/*<Button name="Transfer" callback={() => handleEditUser(user.passId)}/>*/}
                        </div>)
                })
            }
        }
    }

    const showForm = () => {
        if (isFormOpen) {
            return (
                <div>
                    <Form submit={handleSubmitFormAddUser}
                          submitEdit={handleSubmitFormEditUser}
                          cancel={handleCancelForm}
                          handleInputs={handleFormInputs}
                          title={'Add User'}
                          newUser={newUser}/>
                </div>
            )
        }
    }

    const showEditForm = () => {
        if (isEditFormOpen) {
            return (
                <div>
                    <Form submit={handleSubmitFormAddUser}
                          cancel={handleCancelForm}
                          handleInputs={handleFormInputs}
                          title={'Edit User'}
                          newUser={newUser}/>
                </div>
            )
        }
    }

    const showFindUser = () => {
        if (isFindUserOpen) {
            if (!findUser) {
                setErrorMessage("User not found")
            }
            if (findUser) {
                return (
                    <div className='card2 ' key={findUser._id}>
                        <h3><u>User Found:</u></h3>
                        <h3><u>Name:</u> <span>{findUser.name}</span></h3>
                        <h4><u>Pass ID:</u> <span>{findUser.passId}</span></h4>
                        <h4><u>Cash: </u><span>{findUser.cash}</span></h4>
                        <h4><u>Credit:</u> <span>{findUser.credit}</span></h4>
                        <h4><u>Active:</u> <span>{findUser.isActive}</span></h4>
                        <Button name="Delete" callback={() => handleDeleteUser(findUser._id)}/>
                        <Button name="Edit" />
                        <Button name="Close" callback={() => setIsFindUserOpen(false)}/>
                    </div>)
            }
        }
    }


    return (
        <div className='App'>
            <h1> Hello Master Bank Manager</h1>
            <h2>Users: {users.length}</h2>
            {errorMessage}
            <div>
            </div>
            {/*<button onClick={() => getReq()}>get</button>*/}
            <Ui getusers={getReq} addUser={addUser} findUser={handleFindUser}/>
            <div>
                {showFindUser()}
                {showUsers()}
                {showForm()}
                {showEditForm()}
                {showPopUp()}
            </div>
        </div>
    );
}

export default App;
