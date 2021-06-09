import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import 'antd/dist/antd.css';
import axios from 'axios';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Select, message,Modal,notification,Breadcrumb } from 'antd';
notification.config({
    placement: 'topRight',
    top:100,
    duration: 7,
  });
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};
const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

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

class AddCcount extends Component {    
    formRef: any = React.createRef();
    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
    }
    componentDidMount = ()=>{
        if((this.props as any).match.params.id != undefined){
            axios.get(`http://localhost:8888/FindAccount/${(this.props as any).match.params.id}`)
            .then(data => {
                if (data.data.data == null) {
                        Modal.error({
                            title: 'This item not exist !!',
                          });
                          const { history } = this.props as any;
                          history.push('/ListAccount');
                }else{
                    this.formRef.current.setFieldsValue({
                        user: {
                            student: data.data.data.student.name,
                            username: data.data.data.user_name,
                            password: data.data.data.password,
                        }
                    });
                } 
            })  
        }
        fetch('http://localhost:8888/getLstudent')
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
    save = (values) =>{
        axios.post("http://localhost:8888/saveAccount", {
            user_name: values.user.username,
            password: values.user.password,
            student:{
                id:values.user.student  
            } 
        }).then(
            () => {
                const { history } = this.props as any;
                Modal.success({
                    content: 'Save Account success !!',
                  });
                
                history.push('/ListAccount');
                // window.location.href = URL+'ListAccount';
            }
        ).catch(
            error => {
                const errors: any = error.response.data.error;
                errors.forEach(element => {
                    const colunma: string = element.column as any
                    const mss: string = element.msserror as any
                    if(colunma =="ID_invalite"){
                        Modal.error({
                            content: 'This student is not exist !!',
                          });
                        const { history } = this.props as any;
                        window.location.href =URL+'listStudent';
                    }
                    if (colunma === "account") {
                        Modal.error({
                            content: 'UserName is exist !!',
                          });
                    }
                });
            }
        )
    
    }
    update = (values) =>{
        axios.post("http://localhost:8888/updateAccount", {
            user_name: values.user.username,
            password: values.user.password,
            student:{
                id:(this.props as any).match.params.id
            } 
        }).then(
            () => {
                const { history } = this.props as any;
                notification.success({
                    message: "Update Account success !!",
                });
                setTimeout(() => {
                    history.push('/ListAccount');   
                }, 500);
                // window.location.href = URL+'ListAccount';
            }
        ).catch(
            error => {
                const errors: any = error.response.data.error;
                errors.forEach(element => {
                    const colunma: string = element.column as any
                    const mss: string = element.msserror as any
                    if(colunma =="ID_invalite"){
                        Modal.error({
                            content: 'This student is not exist !!',
                          });
                        const { history } = this.props as any;
                        // window.location.href =URL+'listStudent';
                        history.push('/ListAccount');
                    }
                    if (colunma === "account") {
                        Modal.error({
                            content: 'UserName is exist !!',
                          });
                    }
                });
            }
        )
    }
    onFinish = (values: any) => {
      if((this.props as any).match.params.id != undefined){
        this.update(values);
      }else{
          this.save(values);
      }
    }
    render() {
        const data:any[] = (this.state as any).data
        return (
            <div className="wrapper">
            <Header></Header>
            <div className="page-wrap">
                <Paner></Paner>
                <div className="main-content">
                    <div className="cont main-content">
                        <Form  {...layout} name="nest-messages" onFinish={this.onFinish}
                            validateMessages={validateMessages} ref={this.formRef}
                        >
                             <Breadcrumb>
                                <Breadcrumb.Item href="">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/ListAccount">
                                    <UserOutlined />
                                    <span>List Accont</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Edit Account</Breadcrumb.Item>
                            </Breadcrumb>
                            <Form.Item label="Student" name={['user', 'student']} rules={[
                                    {
                                        required: true
                                    }
                                ]}>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select a person"
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
                                                <Option key={index} value={depart.id}>{depart?.name}</Option>
                                            ))}

                                    </Select>
                                </Form.Item>

                            <Form.Item name={['user', 'username']} label="UserName"
                                rules={[{
                                    required: true,
                                    pattern: /^[a-zA-Z0-9]*$/,
                                    message: "UserName is validate !!"
                                },
                                {
                                    max: 30,
                                    message: " UserName Max length must be <= 50 " 
                                },
                                ]}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={['user', 'password']} label="Password" rules={[
                                {
                                    required: true,
                                },
                                {
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    message: "Password is validate !!"
                                },
                                {
                                    max: 15,
                                    message: "Password Max length must be <= 15 " 
                                },
                                
                                ]}>
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                                <Button type="primary" htmlType="submit" className="accountBuutton">
                                    Submit
                                </Button>
                                <Button type="primary" className="Clear-button">
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

export default AddCcount;