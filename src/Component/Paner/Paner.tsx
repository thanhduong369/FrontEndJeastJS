import React, { Component } from 'react';
import { URL } from '../URL/URL';
import {Link} from "react-router-dom";
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
const Paner = () => {
    return (
        <div className="page-wrap">
            <div className="app-sidebar colored">
                <div className="sidebar-header">
                    <a className="header-brand" href="#">
                        <span className="text">Student-Management</span>
                    </a>
                    <button type="button" className="nav-toggle"><i data-toggle="expanded" className="fa fa-heart text-danger toggle-icon"></i></button>
                    <button id="sidebarClose" className="nav-close"><i className="ik ik-x"></i></button>
                </div>
                <div className="sidebar-content">
                    <div className="nav-container">
                        <nav id="main-menu-navigation" className="navigation-main">
                            <div className="nav-lavel">QL Class</div>
                            <div className="nav-item">
                                <a href={"/addnew"}><i className="fas fa-plus-circle"></i><span>Add Class</span></a>
                            </div>
                            <div className="nav-item">
                            <Link to="/" className="link"><i className="fas fa-stream"></i> Show Class </Link>
                            </div>
                            <div className="nav-lavel">QL Student</div>
                            <div className="nav-item">
                                <a href={"/addStudent"}><i className="fas fa-address-card"></i><span>Add Student</span></a>
                            </div>
                            <div className="nav-item">
                                <a href={"/listStudent"}><i className="fas fa-stream"></i><span>Show List Student</span></a>
                            </div>
                            <div className="nav-lavel">QL Account</div>
                            <div className="nav-item ">
                                <a href={"/ListAccount"}><i className="fas fa-stream"></i><span>Show Account</span></a>
                            </div>
                            <div className="nav-lavel">QL System</div>
                            <div className="nav-item ">
                                <a href={"/Logout"}><i className="fas fa-sign-out-alt"></i><span>Log out</span></a>
                            </div>
                            <div className="nav-item ">
                                <a href={"https://support.google.com/mail/answer/8494?co=GENIE.Platform%3DDesktop&hl=vi"}><i className="fas fa-paper-plane"></i><span>Contact</span></a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paner;