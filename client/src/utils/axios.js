// here we write the code to create axios with communication with backend

import axios from 'axios';

const api=axios.create({                // custom axios object
    baseURL:'http://localhost:5000/api',
    headers:{
        'Content-Type':'application/json'
    }
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');  // the token we get at login time , set that token here in local storage and get that token here to set in header for every request
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
    }
    return config;      //Sends modified request forward to backend
});

export default api;