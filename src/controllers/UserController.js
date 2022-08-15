import { InsertDriveFileSharp } from "@mui/icons-material";
import axios from "axios";
import { backendUrl } from "src/constraint";
import { authAxios } from "./Auth";

class UserController{
    
    async login(username,password){
        return axios.post(backendUrl+'login',{username,password}).then(res=>{
            if(res.data){
                const jwt = res.data.tokenType + " " + res.data.accessToken
                console.log(res.data.accessToken);
                localStorage.setItem('accessToken',res.data.accessToken)
                authAxios.defaults.headers.common['Authorization'] =jwt
            }
            return res.data
        }).catch(function (error) {
            if (error.response) {
              return error.response.status
            }
          });
    }

    async create(user){
        return authAxios.post(backendUrl+'users',user).then(res=>{
            return res.data
        }).catch(function (error) {
            if (error.response) {
              return error.response.status
            }
          });
    }
    
    async getProfile(id){
        return authAxios.get(backendUrl+`users/profile/${99}`).then(res=>{
            return res.data
        }).catch(function (error) {
            if (error.response) {
              return error.response.status
            }
          });
    }
    // async isAdmin(){
    //     return authAxios.get(backendUrl+'admin').then(res=>{
    //         return res.data
    //     })
    // }

    async getMe(id){
        return authAxios.get(backendUrl+`users/${id}`).then(res=>{
            return res.data 
        })
    }

    async list(){
        return authAxios.get(backendUrl+'users').then(res=>{
            return res.data
        })
    }


    async edit(user){
        return authAxios.put(backendUrl+'users',user).then(res=>{
            return res.data
        }).catch(function (error) {
            if (error.response) {
              return error.response.status;
            }
          });
    }

    async delete(idUser){
        console.log(idUser);
        return authAxios.delete(backendUrl+`users/${idUser}`).then(res=>{
            return res.data
        }).catch(function (error) {
            if (error.response) {
              return error.response.status;
            }
          });
    }

    async createCode(email){
        return authAxios.get(backendUrl+`code/${email}`).then(res=>{
            return res.data
        }).catch(function (error) {
            if (error.response) {
              return error.response.status
            }
          });
    }

    async checkCode(verInfo){
        return authAxios.post(backendUrl+`check-code`,verInfo).then(res=>{
            return res.data
        })
    }

    async changePass(user,pass){
        const login={
            username:user,
            password:pass
        }
        return authAxios.post(backendUrl+`change-pass`,login).then(res=>{
            return res.data
        })
    }
}

export const userController = new UserController()