import React, { useState, useEffect, Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import { message, Modal, Table } from 'antd';
import 'antd/dist/antd.css';


export const Demo = (props) => {
    var [check, setcheck] = useState(true);
    const [list, setlist] = useState([])
    const dispatch = useDispatch();
    //dispatch(); 
    //const data = useSelector((state: any) => state.ClassReducer.list);
   //(this.state as any).data?.length == 0 ? [] : (this.state as any).data
    const data = useSelector((state: any) => state.ClassReducer.list == undefined ? [] : state.ClassReducer.list);
    console.log(data);
    
    if(data.length!==0){
        setlist(data)
    }
    useEffect(() => {
       
    },[list])
    const columns = [
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
        },
        {
            title: 'Address',
            dataIndex: 'adrres',
            key: 'adrres',
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
            columnWidth: 50
        },
        {
            title: 'Phone number',
            dataIndex: 'phonenumber',
        },
        {
            title: 'Action',
            key: "action",
            render: (record) => <div><a onClick={() => editStudent(record.student_Id)} className="fas fa-pencil-alt"></a> <a className="fas fa-trash-alt" onClick={() => deleteStudent(record.student_Id)}></a></div>,
        },
    ];
    const handleOk = () => {
        setcheck(check = false)
    };
    const handleCancel = () => {
        setcheck(check = false)
    };
    const editStudent = (id) => {
    }
    const deleteStudent = (id) => {
    }
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
                        <Table columns={columns as any} dataSource={data}/>
                        <Modal title="Basic Modal" visible={check} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                            <p>Do you want delete this item ?</p>
                        </Modal>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    )
}

