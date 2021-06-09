import React, { Component } from 'react';
import { URL } from '../URL/URL';
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
const PanerStudent = () => {
    return (
        <div className="page-wrap">
            <div className="app-sidebar colored">
                <div className="sidebar-header">
                    <a className="header-brand" href="#">
                        <span className="text">Student</span>
                    </a>
                    <button type="button" className="nav-toggle"><i data-toggle="expanded" className="fa fa-heart text-danger toggle-icon"></i></button>
                    <button id="sidebarClose" className="nav-close"><i className="ik ik-x"></i></button>
                </div>
                <div className="sidebar-content">
                    <div className="nav-container">
                        <nav id="main-menu-navigation" className="navigation-main">
                        <div className="nav-lavel">YOUR INFORMATION</div>
                            <div className="nav-item">
                                <a href={URL+"addStudent"}><i className="fas fa-users-cog"></i><span>YOUR INFORMATION</span></a>
                            </div>
                            <div className="nav-lavel">TEST</div>
                            <div className="nav-item">
                                <a href={URL+"addStudent"}><i className="fas fa-envelope-open-text"></i><span>YOUR TEST</span></a>
                                <a href={URL+"addStudent"}><i className="fab fa-accusoft"></i><span>SHOW YOUR TEST</span></a>
                            </div>
                            <div className="nav-lavel">Contact</div>
                            <div className="nav-item">
                                <a href={URL+"addStudent"}><i className="fas fa-envelope"></i><span>Gmail</span></a>
                                <a href={URL+"addStudent"}><i className="fab fa-facebook-square"></i><span>FaceBook</span></a>
                            </div>
                            <div className="nav-lavel">SYSTEM</div>
                            <div className="nav-item">
                                <a href={URL+"addStudent"}><i className="fas fa-sign-out-alt"></i><span>Log Out</span></a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PanerStudent;