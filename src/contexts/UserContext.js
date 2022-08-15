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
        userInfo:"",
        wishList:""
    })
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            console.log(localStorage.getItem('accessToken'));
            const value=parseJwt(localStorage.getItem('accessToken'))
            console.log(value.sub);
            userController.getMe(value.sub).then(res=>{
                setState({...state,userInfo:res})

                if (res.role === 'admin') {
                    navigate('/dashboard/app');
                  } else {
                    navigate('/home');
                  }
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

    const setErr=(mess)=>{
        toast.error(mess, {  position: 'bottom-right', autoClose: 3000 })
    }

    const logout=()=>{
        setState({...state,userInfo:""})
        localStorage.removeItem("accessToken")
        navigate('/login', { replace: true });
    }

    return (
        <UserContext.Provider value={{state,setUser,setMess,logout,setErr}}>
            <ToastContainer />
            {props.children}
        </UserContext.Provider>
    )

}

export const parseJwt =(token)=> {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};