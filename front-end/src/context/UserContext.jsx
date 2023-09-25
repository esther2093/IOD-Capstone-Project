import React, { useState, useContext } from "react";
import { useCookies } from 'react-cookie' 


const UserContext = React.createContext();

export const UserProvider = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']); 
    console.log(cookies);

    const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {}); 
    
    const handleUpdateUser = (user) => {
        if (user.email) {
            setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 * 2 }) 
          } else {
            removeCookie('user')
        }         
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
