import axios from 'axios';
import { GetAll,Delete_bY_ID,FindByid } from '../action/ActionStudent/StudentAction';
 // get list student
const fecthdata =()=> {
    return dispatch => {
        // call api to get list student
        axios.get("http://localhost:8888/getList")
        .then(data => {
            // dispatch data to save in store
            dispatch(GetAll(data.data));
        })
    }
}
// get list student by id
export const  deletebyid=(id:string)=> {
    return dispatch => {
        // call list go 
        axios.get(`http://localhost:8888/deletebyid/${id}`)
        .then(data => {
            // dispatch data to save in store 
            dispatch(Delete_bY_ID(data.data));
        })
    }
}

// find student by id
export  const  FindStudentById =(id:string) =>{
    return dispatch => {
         // call api get student by id
         axios.get(`http://localhost:8888/studentById/${id}`)
        .then(data => {
        // dispatch data to store
        dispatch(FindByid(data.data.data));     
        })
    }
}

export default fecthdata;