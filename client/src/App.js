// import { useState } from 'react';
import myApi from './api/Api';
import {useState} from "react";
import Ui from "./components/Ui/Ui";
import Button from "./components/Button/Button";
import './App.css'


function App() {
    // const [user, setUser] = useState('');
    const [users, setUsers] = useState([])
    const [isDataOpen, setIsDataOpen] = useState(false)
    console.log(process.env.NODE_ENV);

    const getReq = async () => {
        console.log('click')
        const {data} = await myApi.get('/users/get-users')
        console.log('data', data)
        setUsers(data)
        setIsDataOpen(!isDataOpen)

    };
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
                        </div>)
                })
            }
        }
    }
    return (
        <div className='App'>
            <h1> Hello Master Bank Manager</h1>
            <div>
            </div>
            {/*<button onClick={() => getReq()}>get</button>*/}

            <Ui getusers={getReq}/>
            <div>
                {showUsers()}
            </div>
        </div>
    );
}

export default App;
