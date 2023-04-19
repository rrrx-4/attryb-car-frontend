import axios from 'axios'
import { getUserFromLS } from '../../utils/localStorage'

const API = axios.create({
    baseURL: "http://localhost:5000"
})


API.interceptors.request.use((req) => {

    const user = getUserFromLS();

    // console.log(user.token);

    if (user) {
        req.headers.authorization = `Bearer ${user.token}`
    }

    return req;

})

// export const signIn = (user) => API.post("/register", user);

console.log(API);

export default API;