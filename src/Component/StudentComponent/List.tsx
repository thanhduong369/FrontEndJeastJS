import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import fecthdata, { FindStudentById } from '../../CallApi/StudentAPI';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import { message, Modal, Table ,notification,Tooltip} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Spin, Alert } from 'antd';
import { render } from 'react-dom';
import { msgE003, msgE111 } from '../Masage/msg';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// config model comfirm
notification.config({
    placement: 'topRight',
    top: 100,
    duration: 7,
});
const { confirm } = Modal;
// interface to dispath action to procedure
interface StaffsList {
    fetchAPI: () => any,
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
class List extends Component<StaffsList, {}, any> {
    constructor(props) {
        super(props)
        // set state component
        this.state = {
            data: [],
            item: null,
            showcomrm: false,
        }
    }
    // column for table 
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
            title: 'Class name',
            dataIndex: 'classname',
            key: 'classname',
        },
        {
            title: 'Gmail',
            dataIndex: 'gmail',
            key: 'gmail',
            columnWidth: 50,
            render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            title: 'Phone number',
            dataIndex: 'phonenumber',
        },
        {
            title: 'Action',
            key: "action",
            render: (record) => <div><a onClick={() => this.editStudent(record.student_Id)} className="fas fa-pencil-alt"></a> <a className="fas fa-trash-alt" onClick={() => this.deleteStudent(record.student_Id)}></a></div>,
        },
    ];
    /**
     * overviews: funtion to check student exist in DB
     * @param id 
     * @param edit 
     */
    findone = (id: string, edit: boolean) => {
        // call api to server to find student by id
        axios.get(`http://localhost:8888/studentById/${id}`)
            .then(data => {
                // chech data is null
                if (data.data.data == null) {
                    // show medol comfirm reload page
                    this.showDeleteConfirm();
                } else {
                    // edit true
                    if (edit == true) {
                        // rf to update student
                        const { history } = this.props as any
                        history.push('/updateStudent/' + id);
                    }
                    // set state
                    this.setState({
                        item: data.data.data,
                        showcomrm: true,
                    })
                }
            })
    }

    /**
     * overviews: funtion to delete student
     * 
     * @param id 
     * 
     */
    deleteStudent = (id: string) => {
        this.findone(id, false)
    }

    /**
     * 
     *  overviews: funtion to edit student
     * 
     * @param id 
     */
    editStudent = (id: string) => {
        this.findone(id, true)
    }


    /**
     *  overviews: delete student after user comfirm delete
     * 
     */
    handleOk = () => {
        // set id with param from url
        const id = (this.state as any).item.student_Id
        // call api to delete student by id
        axios.delete(`http://localhost:8888/DeleteStudent/${id}`).then(() => {
            // close model cofrim delet student
            this.setState({
                showcomrm: false
            })
            // show mesage success
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
     * overviews: close model comfirm when user click cancel
     * 
     */
    handleCancel = () => {
        this.setState({
            showcomrm: false
        })
    };

    /**
     * overviews: funtion run firt
     */
    componentDidMount() {
        // dispatch action to procedure to get all student
        setTimeout(() => {
            this.props.fetchAPI();
        }, 500);
        // set State
        this.setState({
            data: (this.props as any).propName
        })
    }
    /**
     * verviews: funtion to show modol delete comfirm
     * 
     */
    showDeleteConfirm() {
        confirm({
            title: 'This item not exist !',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want reload this page ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                window.location.reload();
            },
            onCancel() {

            },
        });
    }
    render() {
        const check: boolean = (this.state as any).showcomrm
        const data: any[] = (this.state as any).data?.length == 0 ? [] : (this.state as any).data
        const load: boolean = (this.state as any).data?.length == 0 ? true : false
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="page-wrap">
                    <Paner></Paner>
                    <div className="main-content">
                        <div className="cont main-content">
                            <div id="dinh">
                                <form className="form-inline my-2 my-lg-0">
                                    <input name="timkiem" id="timkiem" className="form-control mr-sm-2" type="search" placeholder="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                                <a href={"addstudent"} id="themmoi" className="btn btn-outline-primary">ADD NEW</a>
                            </div>
                            <Table columns={this.columns as any} dataSource={data}  pagination={{ pageSize: 5}} loading={load} />

                            <Modal title="Basic Modal" visible={check} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
                                <p>Do you want delete this item ?</p>
                            </Modal>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}
/**
 * overviews: funton map state procedure from
 * @param state 
 *
 * @returns 
 */
let mapStateToProps = (state) => {
    return {
        propName: state.StudentReducer.list,
    };
};

/**
 * overviews: funtion di Dispatch action
 * 
 * @param dispatch 
 * @returns 
 */
let mapDispatchToProps = (dispatch) => {
    return {
        // get all student
        fetchAPI: () => {
            dispatch(fecthdata());
        },
        // delete student
        delete: (id: string) => {
            dispatch()
        },
        // find one student
        findbyid: (id: string) => {
            dispatch(FindStudentById(id))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(List);