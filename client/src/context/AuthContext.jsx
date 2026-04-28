// in this file we will create a context for authentication that is used to manage the authentication state of the user and provide the necessary functions to login, logout and register the user
/* 
Context API to make auth data available everywhere.
So, AuthContext.jsx acts like a central place (global store) for authentication.
*/
import React from 'react';

export const AuthContext = React.createContext(); //create a global container

export const AuthProvider = ({ children }) => {   //authprovider is a wrapper , wrap all in app.jsx
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);  //loading setloading used to prevent UI from rendering before auth check completes

    React.useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {                       // if user stored in localstorage then start session 
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);   // aftersuccessfully check for user the loadin spinner stop

    } , []);

        const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });   //call backend api
            setUser(data);      // store data in user state
            localStorage.setItem('userInfo', JSON.stringify(data)); // save user + bearer token in browser
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            if (error.response?.data?.needsVerification) throw error.response.data;
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            return data; // Returns { message, email }
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const verifyOTP = async (email, otp) => {
        try {
            const { data } = await api.post('/auth/verify-otp', { email, otp });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'OTP verification failed';
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, verifyOTP, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


