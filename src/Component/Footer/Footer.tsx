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
const Footer = () => {
    return (
        <footer className="footer">
            <div className="w-100 clearfix">
                <span className="text-center text-sm-left d-md-inline-block">Copyright
                © 2018 ThemeKit v2.0. All Rights Reserved.</span> <span className="float-none float-sm-right mt-1 mt-sm-0 text-center">Crafted
                with <i className="fa fa-heart text-danger" /> by <a href="http://lavalite.org/" className="text-dark" target="_blank">Lavalite</a>
                </span>
            </div>
        </footer>
    );
}
export default Footer;