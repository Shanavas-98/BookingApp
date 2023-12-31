/* eslint-disable react/prop-types */
import { createContext, useEffect, useMemo, useState } from "react";
import { getUser } from "../api/userApi";

 export const UserContext = createContext({});

 export function UserContextProvider({children}){
    const [user,setUser] = useState();
    async function fetchUser(){
        try {
            const {data} = await getUser();
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('userToken', data.token);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        if(!user){
            fetchUser()
        }
    },[user])
    const userMemo = useMemo(()=>({user,setUser}),[user,setUser])
    return (
        <UserContext.Provider value={userMemo}>
            {children}
        </UserContext.Provider>
    )
 }