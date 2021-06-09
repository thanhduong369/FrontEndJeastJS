import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import { connect } from 'react-redux'
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button, Select, message,Modal, Breadcrumb,notification } from 'antd';
import { URL } from '../URL/URL';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { msgE004, msgE005 ,msgE006, msgE007, msgE009} from '../Masage/msg';
import { msgE008 } from '../Masage/msg';
import { Pl001, pl002, pl003, pl004, pl005, smgI001,smgI002, smgI004, smgI006 } from '../Masage/msgvalidate';
import { smgI003, smgI005, pl006 } from '../Masage/msgvalidate';
//config message comfirm
notification.config({
    placement: 'topRight',
    top:100,
    duration: 7,
  });
// config layout
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 9,
    },
};

// config message to show
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },

};
const { Option } = Select;
/**
 * overviews: funtion of and
 * @param value 
 */
function onChange(value) {
    console.log(`selected ${value}`);
}

/**
 * overviews: funtion of and
 */
function onBlur() {
    console.log('blur');
}

/**
 * overviews: funtion of and
 */
function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
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
class AddnewStudent extends Component<{}, any> {
    formRef: any = React.createRef();
    constructor(props) {
        super(props)
        //set state 
        this.state = {
            data: []
        }
    }
    /**
     * overviews: funton to save student
     * @param values 
     */
    save = (values) =>{
        // class api to save studen 
        axios.post("http://localhost:8888/savestudent", {
            student_Id: values.user.masv.trim(),
            name: values.user.name.trim(),
            age: values.user.age,
            adrres: values.user.address.trim(),
            phonenumber: values.user.Phone.trim(),
            gmail: values.user.email.trim(),
            classs:{
                id:values.user.Class  
            } 
        }).then(
            // show message success 
            () => {
                  notification.success({
                    message: msgE009,
                  });
                  //reload page
                setTimeout(() => {
                    window.location.href = URL+'listStudent';  
                }, 1000);
            }
        ).catch(
            //handler exception here
            error => {
                const errors: any = error.response.data.error;
                errors.forEach(element => {
                    const colunma: string = element.column as any
                    const mss: string = element.msserror as any
                    // check columa is msgE004
                    if (colunma === "msgE004") { 
                        // show message
                        notification.error({ 
                            message: msgE004,
                          });
                    }
                    // check columa is msgE005
                    if (colunma === "msgE005") {
                        // show message
                        notification.error({
                            message: msgE005,
                          });
                    }
                    // check columa is msgE006
                    if (colunma === "msgE006") {
                        // show message
                        notification.error({
                            message: msgE006,
                          });
                    }
                });
            }
        )
    }
    /**
     * overviews: funton to update student
     * @param values 
     */
    update =(values) =>{
        axios.post("http://localhost:8888/updateStdent", {
            student_Id: (this.props as any).match.params.id,
            name: values.user.name.trim(),
            age: values.user.age,
            adrres: values.user.address.trim(),
            phonenumber: values.user.Phone.trim(),
            gmail: values.user.email.trim(),
            classs:{
                id:values.user.Class  
            } 
        }).then(
            () => {
                // show message success
                notification.success({
                    message: msgE008,
                  });
                //reload page
                setTimeout(() => {
                    window.location.href = URL+'listStudent'; 
                }, 1000);
                
            }
        ).catch(
            // handler errors here
            error => {
                const errors: any = error.response.data.error;
                errors.forEach(element => {
                    const colunma: string = element.column as any
                    const mss: string = element.msserror as any
                    //check colunma is ID_invalite
                    if(colunma =="ID_invalite"){
                        // show message error
                        notification.error({
                            message: msgE007,
                          });
                         //reload the page
                        const { history } = this.props as any;
                        window.location.href =URL+'listStudent';
                    }
                     //check colunma is msgE004
                    if (colunma === "msgE004") {
                        notification.error({
                            message: msgE004,
                          });
                    }
                     //check colunma is msgE005
                    if (colunma === "msgE005") {
                        notification.error({
                            message: msgE005,
                          });
                    }
                     //check colunma is msgE006
                    if (colunma === "msgE006") {
                        notification.error({
                            message: msgE006,
                          });
                    }
                });
            }
        )
    }
    /**
     * overviews: funton to values student
     * @param values 
     */
    onFinish = (values) => {
      if((this.props as any).match.params.id != undefined){
          this.update(values);
      }else{
          this.save(values);
      }
       
    }

    /**
     * overviews: funtion run firt
     */
    componentDidMount() {
        // check id indefned
        if((this.props as any).match.params.id != undefined){
            // call api to server to get list by id
            axios.get(`http://localhost:8888/studentById/${(this.props as any).match.params.id}`)
            .then(data => {
                // check data rq is null
                if (data.data.data == null) {
                        // show message error
                        Modal.error({
                            title: 'This item not exist !!',
                          });
                          const { history } = this.props as any;
                          //rf to listStudent
                          history.push('/listStudent');
                        
                }else{
                    //set data of input form
                    this.formRef.current.setFieldsValue({
                        user: {
                            masv: data.data.data.student_Id,
                            name: data.data.data.name,
                            age: data.data.data.age,
                            address: data.data.data.adrres,
                            Phone: data.data.data.phonenumber,
                            email: data.data.data.gmail,
                            Class: data.data.data.classs.id,
                        }
                    });
                } 
            })  
        }
        // fetch data from server
        fetch('http://localhost:8888/getStudentclass')
            .then(response => response.json())
            .then(
                //handler result here
                (result) => {
                    this.setState({
                        data: result
                    });
                },
                //handler error
                (error) => {
                    console.log("Error: " + error);
                },
            )
    }

    /**
     * overviews: funtion to clear value input
     */
    handClear =()=>{
        this.formRef.current.setFieldsValue({
            user: {
                masv:'',
                name: '',
                age: '',
                address: '',
                Phone: '',
                email: '',
                Class: '',
            }
        });  
    }
    render() {
        const data: any[] = this.state.data
        const readonly:boolean = (this.props as any).match.params.id == undefined ? false :true
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="page-wrap">
                    <Paner></Paner>
                    <div className="main-content">
                        <div className="cont main-content">
                            <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} ref={this.formRef}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/listStudent">
                                    <UserOutlined />
                                    <span>List Student</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{(this.props as any).match.params.id != undefined?"Edit Student":"Add Student"}</Breadcrumb.Item>
                            </Breadcrumb>

                                <Form.Item
                                    name={['user', 'masv']}
                                    label="Masv"
                                    rules={[
                                        {
                                            required: true,
                                           
                                        },
                                        {
                                            pattern: /((sv)|(SV))+([0-9]{5})\b/,
                                            message: smgI006,
                                        }
                                    ]}
                                >
                                    <Input placeholder={pl006} readOnly={readonly}/>
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'name']}
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            max: 49,
                                            message: smgI005 
                                        },
                                        {
                                            pattern: /^[a-zA-Z0-9\s]*$/,
                                            message: smgI004,
                                        }
                                    ]}
                                >
                                    <Input placeholder={pl005}/>
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'email']}
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input placeholder={pl004}/>
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'age']}
                                    label="Age"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'number',
                                            min: 10,
                                            max: 50,
                                        },
                                        {
                                            pattern: /^[0-9]*$/,
                                            message: smgI002,
                                        }
                                    ]}
                                >
                                    <InputNumber placeholder ={pl003} />
                                </Form.Item>
                                <Form.Item name={['user', 'address']} label="Address" rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        max: 99,
                                        message: smgI001
                                    },
                                ]}>
                                    <Input placeholder={pl002}/>
                                </Form.Item>
                                <Form.Item name={['user', 'Phone']} label="Phone number" rules={[
                                    {
                                        required: true,
                                    },{
                                        pattern:/(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                        message:smgI003,
                                    }
                                ]}>
                                    <Input  placeholder={Pl001}/>
                                </Form.Item>
                                <Form.Item label="Class name" name={['user', 'Class']} rules={[
                                    {
                                        required: true
                                    }
                                ]}>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select a Class"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            data.map((depart: any, index: any) => (
                                                <Option key={index} value={depart.id}>{depart?.name_class}</Option>
                                            ))}

                                    </Select>
                                </Form.Item>


                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                     </Button>
                                     <Button onClick ={this.handClear} type="primary" className="Clear-button">
                                        Clear
                                   </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}
// funtion to map state to props
let mapStateToProps = (state) => {
    return {
        propName: state.StudentReducer.list,
        data: state.StudentReducer.item,
    };
};
// funtion to dispatch
let mapDispatchToProps = (dispatch) => {
    return {
        fetchAPI: () => {

        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddnewStudent);