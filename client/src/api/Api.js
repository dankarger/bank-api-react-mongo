import axios from 'axios';
import path from "path";



let myUrl = 'http://localhost:5000/api/'; //development

if (process.env.NODE_ENV === 'production') {
    myUrl = '/api';
}
export default axios.create({
    baseURL: myUrl
});
