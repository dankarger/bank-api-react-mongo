// import { useState } from 'react';
import myApi from './api/Api';
function App() {
    // const [user, setUser] = useState('');

    console.log(process.env.NODE_ENV);

    const getReq = async () => {
        console.log('cl')
        const { data } = await myApi.get('/users/getUsers');

         console.log(data);
    };
    return (
        <div className='App'>

           <h1> Hello World 2</h1>
            <button onClick={()=>getReq()}>get</button>
        </div>
    );
}

export default App;
