import React, { Component } from 'react';
import { rootReducer } from '../Reducers/index';
import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk" 

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
const stote = createStore(rootReducer,applyMiddleware(thunk));

export default stote;