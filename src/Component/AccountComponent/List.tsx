import React, { Component } from 'react';
import { message, Modal, Table,notification } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import Footer from '../Footer/Footer';

class ListAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            showModel:false,
            item:null,
            timkiem:''
        }
    }
    columns = [
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName',
            sorter: (a, b) => a.studentName.length - b.studentName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
            sorter: (a, b) => a.user_name.length - b.user_name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Password',
            dataIndex: 'password',
            filterMultiple: false,
            key: 'password',
            sorter: (a, b) => a.password.length - b.password.length,
            sortDirections: ['descend', 'ascend'],
        },
      
        {
            title: 'Action',
            key: "action",
            render: (record) => <div><a onClick={()=>this.update(record.id)} className="fas fa-pencil-alt"></a></div>,
        },
    ]
    findone(id:number,edit:boolean){
        axios.get(`http://localhost:8888/FindAccount/${id}`)
        .then(data => {
            if (data.data.data == null) {
                for (var j = 0; j <= 1; j++) {
                    Modal.error({
                        title: 'This item not exist !!',
                      });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                if(edit==true){
                    const { history } = this.props as any
                    history.push('/EditAcount/'+id);
                }
                this.setState({
                    item: data.data.data,
                    showModel: true,
                })
            }
        })
    }
    
    handleOk = () => {
    const id  =(this.state as any).item.id 
     axios.delete(`http://localhost:8888/deleteAccount/`+id).then( ()=>{
        this.setState({
            showModel: false
        })
        //
        Modal.success({
            title: 'Delete Account success !!',
          });
        setTimeout(() => {
            window.location.reload();
        }, 500);
     }
     ) 
      
    };
    handleCancel = () => {
        
        this.setState({
            showModel:false
        })
    };
    delete =(id:number)=>{
       this.findone(id,false);
    }
    update=(id:number)=>{
        this.findone(id,true);
    }
    updateInputValue = event => {
        this.setState({
            timkiem: event.target.value
        });
    }
    timkiem = event => {
     event.preventDefault();
        fetch(`http://localhost:8888/timkiemaccount/${(this.state as any).timkiem}`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        data: result
                    });
                },
                (error) => {
                    console.log("Error: " + error);
                },
            )
    }

    componentDidMount(){
        axios.get('http://localhost:8888/getallAccount')
        .then(
            (result) => {
                setTimeout(() => {
                    this.setState({
                        data: result.data
                    });
                }, 1000);
            },
            (error) => {
                console.log("Error: " + error);
            },
        )
    }
    render() {
        const data:any[] = (this.state as any).data
        const check = (this.state as any).showModel
        const load:boolean = data.length==0?true:false
        
        return (
            <div className="wrapper">
                    <Header></Header>
                    <div className="page-wrap">
                        <Paner></Paner>
                        <div className="main-content">
                            <div className="cont main-content">
                                <div id="dinh">
                                    <form className="form-inline my-2 my-lg-0"  onSubmit={(event)=>this.timkiem(event)}>
                                        <input onChange={event => this.updateInputValue(event)}    name="timkiem" id="timkiem" className="form-control mr-sm-2" type="search" placeholder="Search" />
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </div>
                                <Table columns={this.columns as any} dataSource={data} className={'namexxx'} pagination={{ pageSize: 5}} loading={load} />
                                 
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

export default ListAccount;