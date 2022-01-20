import axios from 'axios';
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, '../../../.env') });


let myUrl = 'http://localhost:5000/api/'; //development

if (process.env.NODE_ENV === 'production') {
    myUrl = '/api';
}
export default axios.create({
    baseURL: myUrl
});
