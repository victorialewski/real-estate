import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

class pocService {

    sendSimpleEmail(reserve){
        return axios.get(API_BASE_URL);
    }

    createPOC(reserve){
        return axios.post(API_BASE_URL, reserve);
    }
}
export default new pocService()