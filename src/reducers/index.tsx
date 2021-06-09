import React, { Component } from 'react';
import {combineReducers} from 'redux'
import ClassReducer from './Class';
import StudentReducer from './Student';
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
export const rootReducer = combineReducers({ 
  ClassReducer:ClassReducer,
  StudentReducer:StudentReducer
});
export type RootState = ReturnType<typeof rootReducer>