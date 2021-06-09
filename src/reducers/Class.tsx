import React, { Component } from 'react';
/**
 * 
 * @author DuongDT 19
 * 
 * @version 1.0
 * 
 * @Date 2/6/2021
 * 
 * 
 * Modification Logs:
 * 
 * Date				AUTHOR 				DESCRIPTION
 * ------------------------------------------------------
 * 2/6/2021			DuongDT19			Create
 *
 */
const initialState = {
    list:[],
    item:{} as any
}
const ClassReducer =(state:any = initialState,action)=>{
 switch(action.type){
    //  check typeaction is  GET_ALL_CLASS
     case 'GET_ALL_CLASS':{
      (action.payload as any).forEach(element => {
         (state.list as any).push(element)
      });
       return [state]
       break;
     }
     // check type action FIND_ONE_CLASS
     case 'FIND_ONE_CLASS':{
        const itex = action.payload
        return {
           ...state,
           item:{...state.item = itex}
        }
        break;
     }
     // check type class DELETE_BY_ID
     case 'DELETE_BY_ID':{
        console.log(action.payload);
        
        return null;
        break;
     }
     // check type class UPDATE_CLASS_BY_ID
     case 'UPDATE_CLASS_BY_ID':{
        return null;
        break;
     }
     default:{
         return state;
     }
 }
}

export default ClassReducer;