import React, { Component } from 'react';
import DemoReadFile from './DemoReadFile';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
import { getConfigFileParsingDiagnostics } from 'typescript';
import { filehandler } from '../../FileHandler/File';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import Footer from '../Footer/Footer';
import { useDispatch } from 'redux-react-hook';
import { info } from 'console';


const { Dragger } = Upload;
let listFile  = null;

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
class FileClass extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
    }
    show =()=>{
    }
    componentDidMount(){
       // console.log("file"+file);
    }
    changxx =() =>{
      console.log('lisst'+listFile);
      this.setState({})
        
    }
    file = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info):any {
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                //console.log(info.fileList[0]);
                   listFile  = info.fileList[0].originFileObj
                   filehandler(listFile);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        // onDrop(e) {
        //     console.log('Dropped files', e.dataTransfer.files);
        // },
    };
    render() {
        console.log(listFile);
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="page-wrap">
                    <Paner></Paner>
                    <div className="main-content">
                        <div className="cont main-content">
                        <div id="dinh">
                                <div className="buttonx">
                                <a href={"/"} className="btn btn-outline-primary">Back to List</a>
                                </div>
                            </div>
                        <Dragger {...this.file} accept=".csv,.xlsx,.xls"  onPreview={this.changxx}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined  type="file" accept=".csv,.xlsx,.xls"/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                     </p>
                    </Dragger>
                    <a className="filemau" download href="Component/URL/Book1.xlsx">Dowload file template here !!</a>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
              
        );
    }
}

export default FileClass;

function changxx() {
    throw new Error('Function not implemented.');
}
