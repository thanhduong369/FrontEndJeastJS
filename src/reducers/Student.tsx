import Item from 'antd/lib/list/Item';
import React, { Component } from 'react';

const initialState = {
    list:[],
    item:null,
   }

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
const StudentReducer =(state = initialState,action)=>{
    switch(action.type){
        case 'ADD_NEW':{
            return null;
          }
          // check type action is  GET_ALL_STUDENT
          case 'GET_ALL_STUDENT':{
            (action.payload as any).forEach(element => {
               (state.list as any).push(element)
            });
            action.tiem = null
             return [state]
          }
          // check type action is DELETE_BY_ID
          case 'DELETE_BY_ID':{
             return null;
          }
          // check type action is FIND_BY_ID
          case 'FIND_BY_ID':{
                return {
                   ...state,
                   item:action.payload as {}
                }       
          }
          // check type action  UPDATE_STUDENT_BY_ID
          case 'UPDATE_STUDENT_BY_ID':{
             return null;
          }
          default:{
              return state;
          }
    }
}

export default StudentReducer;