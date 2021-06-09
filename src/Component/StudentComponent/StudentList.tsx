import React, { Component } from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import { message, Modal, Table ,notification,Tooltip} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { msgE111 } from '../Masage/msg';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// config message comfirm
notification.config({
    placement: 'topRight',
    top: 100,
    duration: 7,
});
const { confirm } = Modal;

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
export default class StudentList extends Component<{},any> {
    constructor(props){
        super(props)
        // set state component
        this.state = {
            data:[],
            item: null,
            showcomrm: false,
        }
    }
    // define column for table 
    columns = [
        {
            title: 'Id Student',
            dataIndex: 'student_Id',
            key: 'student_Id',
            
        },
        {
            title: 'Name Student',
            dataIndex: 'name',
            filterMultiple: false,
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
            render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            title: 'Address',
            dataIndex: 'adrres',
            key: 'adrres',
            render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Gmail',
            dataIndex: 'gmail',
            key: 'gmail',
            columnWidth: 50,
            render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            title: 'Class name',
            dataIndex: 'classname',
            key: 'classname',
        },
        {
            title: 'Phone number',
            dataIndex: 'phonenumber',
        },
        {
            title: 'Action',
            key: "action",
            render: (record) => <div><a onClick={()=>this.editStudent(record.student_Id)} className="fas fa-pencil-alt"></a> <a className="fas fa-trash-alt" onClick={() => this.deleteStudent(record.student_Id)}></a></div>,
        },
    ];
    /**
     * overviews: funtion to delete student when user was comfirm delete
     */
    handleOk = () => {
        // get id from state item
        const id = (this.state as any).item.student_Id
        // call api to server delete student
        axios.delete(`http://localhost:8888/DeleteStudent/${id}`).then(() => {
         // close model comfirm delete   
        this.setState({
                showcomrm: false
            })
            // show mesaage delete success
            notification.success({
                message: msgE111,
            });
            // reload page
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        )
    };
    /**
     * overviews:fution to close model comfirm delete
     * 
     */
    handleCancel = () => {
        this.setState({
            showcomrm: false
        })
    };
    /**
     * 
     * overviews:model delete item is not exist in DB
     */
    showDeleteConfirm() {
        confirm({
            title: 'This item not exist !',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want reload this page ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            // reload page
            onOk() {
                window.location.reload();
            },
            // do not anything
            onCancel() {

            },
        });
    }

    /**
     * overviews:funtion to delete student
     * @param id 
     * 
     */
    deleteStudent = (id: string) => {
        this.findone(id, false)
    }
    /**
     * overviews:funtion to edit student
     * @param id 
     * 
     */
    editStudent = (id: string) => {
        this.findone(id, true)
    }

    /**
     * overviews:funtion to check student exist in DB
     * 
     * @param id 
     * @param edit 
     */
    findone = (id: string, edit: boolean) => {
        // call api to server to find student by id param
        axios.get(`http://localhost:8888/studentById/${id}`)
            .then(data => {
                // check data rq null
                if (data.data.data == null) {
                    // show model comfirm reload page item tem not exist
                   this.showDeleteConfirm();
                } else {
                    // check idit is true
                    if (edit == true) {
                        // rf tu update student
                        const { history } = this.props as any
                        history.push('/updateStudent/' + id);
                    }
                    //set  state for component
                    this.setState({
                        item: data.data.data,
                        showcomrm: true,
                    })
                }
            })
    }
    /**
     * overviews:funtion to search student with malop and txt search
     * @param event 
     */
    updateInputValue = event => {
        
        if (event.target.value != '') {
            // get malop from url 
            const malop:string = (this.props as any).match.params.malop;
            // class Api to get list search 
            fetch(`http://localhost:8888/timkiemlop/${malop}/${event.target.value}`)
                .then(response => response.json())
                .then(
                    // handler data search here
                    (result) => {
                        this.setState({
                            data: result
                        });
                    },
                    // handler error here
                    (error) => {
                        console.log("Error: " + error);
                    },
                )
        }
    }

    /**
     * overviews:futiton run firt
     */
    componentDidMount(){
        // get malop from url 
     const malop:string = (this.props as any).match.params.malop
      // call api to get list student by malop
        axios.get(`http://localhost:8888/getalljoin/${malop}`)
        .then(data => {
            // check data is null
            if(data.data.length == 0){
                const { history } = this.props as any;
                // go to list class
                history.push('/');  
            }
            setTimeout(() => {
                this.setState({
                    data:data.data
                })  
            }, 1000);
        })
    }

    render() {
        const check: boolean = (this.state as any).showcomrm
        const {data} = this.state
        const load  =data.length == 0? true:false
        return (
             <div className="wrapper">
                    <Header></Header>
                    <div className="page-wrap">
                        <Paner></Paner>
                        <div className="main-content">
                            <div className="cont main-content">
                                <div id="dinh">
                                    <form className="form-inline my-2 my-lg-0">
                                        <input onChange={event => this.updateInputValue(event)} name="timkiem" id="timkiem" className="form-control mr-sm-2" type="search" placeholder="Search" />
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                    <a href={"addstudent"} id="themmoi" className="btn btn-outline-primary">ADD NEW</a>
                                </div>
                                <Table columns={this.columns as any} dataSource={data} loading={load} pagination={{ pageSize: 5}}/>

                                <Modal title="Basic Modal" visible={check} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
                                    <p>Do you want delete this item ?</p>
                                </Modal>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
        )
    }
}
