import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userController } from "src/controllers/UserController";
import { getCookie } from "src/helper/Cookies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext();

export const UserContextProvider =(props)=>{
    const [state,setState]=useState({
        isLogin:false,
        userInfo:""
    })
    const navigate = useNavigate();

    useEffect(()=>{
        if(getCookie("id")!==""){
            userController.getMe(getCookie("id")).then(res=>{
                setUser(res)
                // if(res.role=="admin"){
                //     navigate('/dashboard/app', { replace: true });
                // }else{
                //     navigate('/login');
                // }
            })
        }else{
            navigate('/login', { replace: true });
        }
    },[])

    const setUser = (user)=>{
        setState(prev=>({...prev,userInfo:user,isLogin:true}))
    }

    const setMess=(mess)=>{
        toast.success(mess, {  position: 'bottom-right', autoClose: 3000 })
    }


    return (
        <UserContext.Provider value={{state,setUser,setMess}}>
            <ToastContainer />
            {props.children}
        </UserContext.Provider>
    )

}