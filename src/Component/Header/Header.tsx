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
const Header =()=> {
    return(
        <header className="header-top" header-theme="light">
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <div className="top-menu d-flex align-items-center">
              <button type="button" className="btn-icon mobile-nav-toggle d-lg-none">
                <span />
              </button>
              <div className="header-search">
                <div className="input-group">
                  <span className="input-group-addon search-close"> <i className="fa fa-heart text-danger" />
                  </span> <input type="text" className="form-control" /> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> <span className="input-group-addon search-btn"> <i className="fa fa-heart text-danger" /></span> 
                </div>
              </div>
            </div>
            <div className="top-menu d-flex align-items-center">
              <div className="dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="notiDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fab fa-facebook-messenger" /><span className="badge bg-danger">3</span></a>
              </div>
              <div className="dropdown">
                <a className="dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="avatar" src="" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;