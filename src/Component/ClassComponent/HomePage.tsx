import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Modal, Button, message} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Table, Input, Space, Breadcrumb, notification, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { msgE002 } from '../Masage/msg';
import { deleteClassByID, findClassByID, getListClass } from '../../CallApi/ClassApi';
import { deletebyid } from '../../CallApi/StudentAPI';
// config mesage comfirm
notification.config({
    placement: 'topRight',
    top: 100,
    duration: 7,
});
const { confirm } = Modal;

// create interface to dispath
interface ClassDispath {
    // get list class
    fetchAPI: () => any,
    // find class by id 
    findbyid: (id:number) => any
    //delete class by id
    deleteClassByID:(id:number) =>any
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
class HomePage extends Component<ClassDispath, any>{
    
    constructor(props) {
        super(props)
        // set state for component
        this.state = {
            data: [],
            mss: "",
            timkiem: "",
            showmss: false,
            deleteitem: false,
            id: 0,
            filteredInfo: null,
            sortedInfo: null,
            item:null
        }
    }
    /**
     * overviews: funtion to check class exist in DB
     * @param id 
     * @param edit 
     */
    checkid = (id: number, edit: boolean) => {
        // class api funtion
        this.props.findbyid(id);
        this.setState({
            item:(this.props as any).Iiem
        })
        // call api funton from server
        axios.get(`http://localhost:8888/getByID/${id}`)
            .then(data => {
                // chech data rp is null
                if (data.data.data == null) {
                    // show mesage comfirm
                   this.showDeleteConfirm();
                } else if (edit == true) {
                    // check edit is true
                    const { history } = this.props as any
                    // rf to update class with id
                    history.push('/update/' + id); 
                }
                // can delete
                else {
                    //set state
                    this.setState({
                        item:data.data.data.data,
                        showmss: true
                    })
                }
            })
    }
    /**
     * overviews: funtion to Search class
     * @param event 
     */
    updateInputValue = event => {
        //check value to search is ''
        if (event.target.value != '') {
            // fetch Api from server
            fetch(`http://localhost:8888/timkkiem/${event.target.value}`)
                .then(response => response.json())
                .then(
                    // handler data rq from server
                    (result) => {
                        console.log(result);
                        this.setState({
                            data: result
                        });
                    },
                    //handler errors
                    (error) => {
                        console.log("Error: " + error);
                    },
                )
        }
    }

    submit = (id: number) => {
        this.setState({
            showmss: true,
            id: id
        })
    };
    /**
     * overviews: funtion to delete class 
     */
    handleOk = () => {
        // set id equal item.id in this state
        const id = this.state.item.id
        // check item to delete not null
        if (this.state.item != null) {
            // call api to server to delete class with param id 
            axios.delete(`http://localhost:8888/DeleteByIdClass/${id}`)
                .then(() => {
                    // close massage comfirm delete
                    this.setState({
                        showmss: false
                    })
                    // show massage delete seccess
                    notification.success({
                        message: msgE002,
                    });
                    // reload the page
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }

                ).catch(() => {
                     // show message error
                    this.setState({
                        showmss: false
                    })
                    // this class have student 
                    Modal.error({
                        title: 'Delete Class Error !!',
                        content: 'this class having student !!',
                    });
                }
                )
        }

    };

    /**
     * overviews: funtion to close model comfirm delete
     */
    handleCancel = () => {
        // set state to close model
        this.setState({
            showmss: false
        })
    };
    /**
     * overviews: funtion to delete class
     */
    deleteClass = (id: number) => {
        this.checkid(id, false);

    }
    /**
     * overviews: funtion to edit class
     */
    eidtClass = (id: number) => {
        this.checkid(id, true);
    }
    /**
     * overviews: funtion Search class with txttimkiem
     * @param event 
     * 
     */
    timkiem = event => {
        event.preventDefault();
     
        fetch('http://localhost:8888/getall')
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
    /**
     * overviews: funtion of and
     * 
     * @param pagination 
     * @param filters 
     * @param sorter 
     */
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    /**
     * overviews:funtion of and
     */
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    /**
     * overviews:funtion of and
     */
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };
    /**
     * overviews:funtion of and
     */
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'id_class',
            },
        });
    };
    /**
     * funtion to run firt
     */
    componentDidMount() {
        // dispath action to server
        this.props.fetchAPI();
        //set data to list
        this.setState({
            data:(this.props as any).List
        })
    }

    /**
     * overviews:funtion of and
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
    showlist(malop: string) {
        axios.get(`http://localhost:8888/getalljoin/${malop}`).
            then(
                (result) => {
                    if (result.data.length == 0) {
                        Modal.warning({
                            content: "This class not contain student !!"
                        })
                    } else {
                        (this.props as any).history.push('ListSudentByIDClass/' + malop)
                    }
                }
            )
    }
    render() {
        const data: any[] = this.state.data 
        console.log((this.props as any).Iiem);
        const load: boolean = data.length == 0 ? true : false
        const inshow: boolean = this.state.showmss
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Class Code',
                dataIndex: 'malop',
                key: 'malop',
                sorter: (a, b) => a.malop.length - b.malop.length,
                sortOrder: sortedInfo.columnKey === 'malop' && sortedInfo.order,
                ellipsis: true,
                render: text => <a onClick={() => this.showlist(text)} style={{ color: "blue" }}>{text}</a>,
            },
            {
                title: 'Member',
                dataIndex: 'mem_ber',
                key: 'mem_ber',
                sorter: (a, b) => a.mem_ber - b.mem_ber,
                sortOrder: sortedInfo.columnKey === 'mem_ber' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Name Class',
                dataIndex: 'name_class',
                key: 'name_class',
                sorter: (a, b) => a.name_class.length - b.name_class.length,
                sortOrder: sortedInfo.columnKey === 'name_class' && sortedInfo.order,
                ellipsis: true,
                render: text => <Tooltip title={text}>{text}</Tooltip>
            },
            {
                title: 'Action',
                key: "action",
                render: (record) => <div><a onClick={() => this.eidtClass(record.id)} className="fas fa-pencil-alt"></a> <a className="fas fa-trash-alt" onClick={() => this.deleteClass(record.id)}></a> </div>,
            },
        ];
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="page-wrap">
                    <Paner></Paner>
                    <div className="main-content">

                        <div className="cont main-content">

                            <div id="dinh">
                                
                                <form className="form-inline my-2 my-lg-0" onSubmit={this.timkiem}>
                                    <input onChange={event => this.updateInputValue(event)} name="timkiem" id="timkiem" className="form-control mr-sm-2" type="search" placeholder="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Reset</button>
                                </form>
                                <div className="buttonxx">
                                <a href={"uploadFileClass"} id="themmoi" className="fas fa-file-upload"><i></i></a>
                                <a href={"addnew"} id="themmoi" className="btn btn-outline-primary">ADD NEW</a>
                                </div>
                            </div>
                            <>
                                <Space style={{ marginBottom: 16 }}>
                                    <Button onClick={this.setAgeSort}>Sort ID</Button>
                                    <Button onClick={this.clearFilters}>Clear filters</Button>
                                    <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                                </Space>
                                <Table
                                    loading={load}
                                    columns={columns}
                                    dataSource={data}
                                    onChange={this.handleChange}
                                    pagination={{ pageSize: 5 }} />
                            </>

                            <Modal title="Basic Modal" visible={inshow} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
                                <p>Do you want delete this item !!</p>
                            </Modal>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
};

/**
 * overviews: funtion to maping state from store to props of component
 * @param state 
 * @returns 
 */
let mapStateToProps = (state) => {
    return {
        List: state.ClassReducer.list,
        Iiem: state.ClassReducer.item,
    };
};

/**
 * overviews: funtion to dispatch action to procedure
 * @param dispatch 
 * @returns 
 */
let mapDispatchToProps = (dispatch) => {
    return {
        //get list all
        fetchAPI: () => {
            dispatch(getListClass());
        },
        //delete clss class
        deleteClassByID: (id: number) => {
            dispatch(deleteClassByID(id));
        },
        // find class by id
        findbyid: (id: number) => {
            dispatch(findClassByID(id))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);