import axios from "axios";
import { GetAll,FindOneClass,DeleteClass } from "../action/ActionClass/ClassAction";


// get list class
export const getListClass =()=> {
    return dispatch => {
        // call api to get list class
        axios.get("http://localhost:8888/getall")
        .then(data => {
            // dispatch data to store
            dispatch(GetAll(data.data));
        })
    }
}
// get class by id 
export const findClassByID = (id:number) =>{
    return dispatch =>{
        // call api to server get class by di
        axios.get(`http://localhost:8888/getByID/${id}`)
        .then(data=>{

            // dispatch data to store
            dispatch(FindOneClass(data.data.data))
        })
    }

}

// delete class by id
export const deleteClassByID = (id:number) =>{
    return dispatch =>{
        // call api to delete class by id
         axios.delete(`http://localhost:8888/DeleteByIdClass/${id}`)
        .then(data=>{
            // dispatch data to store
            dispatch(DeleteClass(id))
        })
    }

}