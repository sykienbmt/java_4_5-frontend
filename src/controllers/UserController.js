import axios from "axios";
import { backendUrl } from "src/constraint";

class UserController{
    
    async login(username,password){
        return axios.post(backendUrl+'login',{username,password}).then(res=>{
            return res.data
        }).catch(function (error) {
            if (error.response) {
            //   console.log(error.response.data);
            //   console.log(error.response.status);
              return error.response.status
            //   console.log(error.response.headers);
            }
          });
    }

    async create(user){
        return axios.post(backendUrl+'users',user).then(res=>{
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
        return axios.get(backendUrl+"users/"+id).then(res=>{
            return res.data 
        })
    }

    // async list(){
    //     return authAxios.get(backendUrl+'users').then(res=>{
    //         return res.data
    //     })
    // }

    // async edit(user){
    //     return authAxios.post(backendUrl+'users/edit',user).then(res=>{
    //         return res.data
    //     })
    // }

    // async delete(idUser){
    //     console.log(idUser);
    //     return authAxios.post(backendUrl+'users/delete',{idUser}).then(res=>{
    //         return res.data
    //     })
    // }
}

const parseJwt =(token)=> {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const userController = new UserController()