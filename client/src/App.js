import './App.css'
import myApi from './api/Api';
import React, {useEffect, useState} from "react";
import Ui from "./components/Ui/Ui";
import Button from "./components/Button/Button";
import Form from "./components/Form/Form";
import PopupWindow from "./components/PopUpWindow/PopupWindow";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
    const [users, setUsers] = useState([]);
    const [isDataOpen, setIsDataOpen] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditFormOpen, setEditIsFormOpen] = useState(false);
    const [isFindUserOpen, setIsFindUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({});
    const [popUpAmount, setPopUpAmount] = useState(0);
    const [findUser, setFindUser] = useState({});
    const [isPopUpWindow, setIsPopUpWindow] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState('')
    const [popUpId, setPopUpId] = useState(Number)
    const [errorMessage, setErrorMessage] = useState('');
    const [renderPage, setRenderPage] = useState(false)

    useEffect(() => {
        setUsers(getReq());
    }, []);

    useEffect(() => {
        setUsers(getReq())
        setIsDataOpen(false)
    }, [renderPage])

    //Handle Functions
    const getReq = async () => {
        setErrorMessage('')
        try {
            const {data} = await myApi.get('/users/get-users')
            setUsers(data)
            setIsDataOpen(!isDataOpen)
        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.response.data.message)
        }
    };
    const addUser = async () => {
        setIsFormOpen(!isFormOpen);
    }

    const handleSubmitFormAddUser = async () => {
        setErrorMessage('')
        try {
            window.confirm("Are you sure you want to add user?")
            const {data} = await myApi.post('/users/add-user',
                {
                    name: newUser.name,
                    passId: newUser.passId,
                    cash: newUser.cash,
                    credit: newUser.credit,
                    isActive: newUser.active === true ? "true" : "false"
                })
            setIsFormOpen(!isFormOpen);
            setRenderPage(!renderPage);
        } catch (e) {
            console.log({e});
            setErrorMessage(e.response.data.message)
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
            setErrorMessage(e.response.data.message)
        }
    }

    const handleCancelForm = () => {
        setIsFormOpen(false)
        setEditIsFormOpen(false)
    }

    const handleDeleteUser = async (id) => {
        setErrorMessage('')
        window.confirm("Are You sure you want to delete this user ?");
        try {
            const user = await myApi.delete(`/users/delete-user/${id}`)
            setUsers(getReq());
            setIsDataOpen(true)
        } catch (e) {
            console.log(e)
            setErrorMessage(e.response.data.message)
        }
    }

    const handleFormInputs = (e) => {
        console.log(e.target.name, e.target.value);
        let newObjectUser = newUser
        newObjectUser[e.target.name] = e.target.value
        setNewUser(newObjectUser)
    }

    const handleFindUser = async (passId) => {
        try {
            if (passId < 1) {
                throw Error('PassPort ID cant be less than 1')
            }
            const {data} = await myApi.get(`/users/get-user/${passId}`)
            if (!data) return setErrorMessage('User not found')
            setFindUser(data)
            setErrorMessage('')
            setIsFindUserOpen(true)
            return data
        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.response.data.message)
        }
    }
    const handleEditUser = async (passId) => {
        const user = await handleFindUser(passId);
        setNewUser(user)
        setEditIsFormOpen(true);
    }

    const handleWithdraw = (passId) => {
        setPopUpTitle('withdraw')
        setPopUpId(passId)
        setIsPopUpWindow(!isPopUpWindow);
    }

    const handleDeposit = (passId) => {
        setPopUpTitle('deposit')
        setPopUpId(passId)
        setIsPopUpWindow(!isPopUpWindow);
    }

    const handleAddCredit = (passId) => {
        setPopUpTitle('add credit')
        setPopUpId(passId)
        setIsPopUpWindow(!isPopUpWindow);
    }

    const handleChangePopUp = (e) => {
        setPopUpAmount(e.target.value)
    }

    const showPopUp = () => {
        if (isPopUpWindow) {
            let submitFunction
            if (popUpTitle === 'withdraw') submitFunction = () => withdraw(popUpId, popUpAmount);
            if (popUpTitle === 'deposit') submitFunction = () => deposit(popUpId, popUpAmount);
            if (popUpTitle === 'add credit') submitFunction = () => addCredit(popUpId, popUpAmount);
            return <PopupWindow title={popUpTitle}
                                cancel={() => setIsPopUpWindow(false)}
                                handleChange={handleChangePopUp}
                                submit={submitFunction}
            />
        }
    }

    const deposit = async (passId, amount) => {
        try {
            const {data} = await myApi.put(`/users/deposit/${passId}`, {amount: amount})
            setRenderPage(!renderPage);
            setIsPopUpWindow(false);
            return data
        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.response.data.message)
        }
    }

    const withdraw = async (passId, amount) => {
        try {
            const {data} = await myApi.put(`/users/withdraw/${passId}`, {amount: amount})
            setRenderPage(!renderPage);
            setIsPopUpWindow(false);
            return data
        } catch (e) {
            console.log(e.response);
            setErrorMessage(e.response.data.message)
        }
    }

    const addCredit = async (passId, amount) => {
        try {
            const {data} = await myApi.put(`/users/add-credit/${passId}`, {amount: amount})
            setRenderPage(!renderPage);
            setIsPopUpWindow(false);
            return data

        } catch (e) {
            console.log(e.message);
            setErrorMessage(e.response.data.message)
        }
    }

    //Show Functions
    const showUsers = () => {
        if (users.length > 0) {
            return users.map(user => {
                return (
                    <div className='card' key={user._id}>
                        <div className="items-div">
                            <p className="item">Name: <span>{user.name}</span></p>
                            <p className="item">Pass ID: <span>{user.passId}</span></p>
                            <p className="item">Cash: <span>{user.cash}</span></p>
                            <p className="item">Credit: <span>{user.credit}</span></p>
                        </div>
                        <div className="buttons-div">
                            <Button className={'show-user-button'} name="Withdraw"
                                    callback={() => handleWithdraw(user.passId)}/>
                            <Button className={'show-user-button'} name="Deposit"
                                    callback={() => handleDeposit(user.passId)}/>
                            <Button className={'show-user-button'} name="Add Credit"
                                    callback={() => handleAddCredit(user.passId)}/>
                            <Button className={'show-user-button'} name="Edit"
                                    callback={() => handleEditUser(user.passId)}/>
                            <Button className={'show-user-button delete'} name="Delete"
                                    callback={() => handleDeleteUser(user._id)}/>
                        </div>
                    </div>
                )
            })
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
                    <div className='find-user' key={findUser._id}>
                        <div className='info'>
                            <h3><u>User Found:</u></h3>
                            <h3><u>Name:</u> <span>{findUser.name}</span></h3>
                            <h4><u>Pass ID:</u> <span>{findUser.passId}</span></h4>
                            <h4><u>Cash: </u><span>{findUser.cash}</span></h4>
                            <h4><u>Credit:</u> <span>{findUser.credit}</span></h4>
                            <h4><u>Active:</u> <span>{findUser.active}</span></h4>
                        </div>
                        <div>
                            <Button className={"add-user"} name="Edit"
                                    callback={() => handleEditUser(findUser.passId)}/>
                            <Button className={"add-user delete2"} name="Delete"
                                    callback={() => handleDeleteUser(findUser._id)}/>
                            <Button className={"add-user"} name="Close" callback={() => setIsFindUserOpen(false)}/>
                        </div>
                    </div>)
            }
        }
    }

    return (
        <ErrorBoundary>
            <div className='App'>
                <div className="heading">
                    <h1> Welcome to Bank Manager</h1>
                    {/*<h2>Users: {users.length}</h2>*/}
                </div>
                <div className="error-div">
                    {errorMessage}
                </div>
                <div>
                </div>
                <Ui getusers={getReq} addUser={addUser} findUser={handleFindUser} usersLength={users.length}/>
                <div>
                    {/*<ListTable />*/}
                    {showFindUser()}
                    <div className="show-users">
                        {showUsers()}
                    </div>
                    {showForm()}
                    {showEditForm()}
                    {showPopUp()}
                </div>
            </div>
            <div className="error-div-bottom">
                {errorMessage}
            </div>
        </ErrorBoundary>
    );
}

export default App;
