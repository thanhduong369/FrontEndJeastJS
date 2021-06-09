import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paner from '../Paner/Paner';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button, Breadcrumb, notification } from 'antd';
import { Prompt } from 'react-router-dom'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { URL } from '../URL/URL';
import { msE50, msgE30, msgE32, msgE34, msgE51, msgE001 } from '../Masage/msg';
notification.config({
    placement: 'topRight',
    top: 100,
    duration: 7,
});


// config layout
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};

// config msg and
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
class ClassPage extends Component<{}, any> {

    formRef: any = React.createRef();
    constructor(props) {
        super(props)
        //define state for component
        this.state = {
            id_class: '',
            name_class: '',
            mem_ber: '',
            ID_invalite: '',
            leave: false
        }
    }
    //ComponentDidMount run firt 
    componentDidMount() {
        //check params.id undefined
        if ((this.props as any).match.params.id != undefined) {
            //fetch data from Server
            fetch(`http://localhost:8888/getByID/${(this.props as any).match.params.id}`)
                .then(response => response.json())
                .then(
                    (result) => {
                        // set data for input 
                        this.formRef.current.setFieldsValue({
                            user: {
                                id_class: result.data.malop,
                                name_class: result.data.name_class,
                                mem_ber: result.data.mem_ber,
                            }
                        });
                    },
                    (error) => {
                        // log errors here
                        console.log("Error: " + error);
                    },
                )
        }

    }
    /**
     * @overviews: funtion to add new class
     * @param values 
     */
    saveClass = (values) => {
        // call api with param values get from input
        axios.post("http://localhost:8888/save", {
            malop: values.user.id_class,
            name_class: values.user.name_class,
            mem_ber: values.user.mem_ber,
        }).then(
            //show mesage success
            () => {
                notification.success({
                    message: msE50,
                });
                setTimeout(() => {
                    window.location.href = URL;
                }, 1000);
            }
        ).catch(
            // handler erroes
            error => {
                const errors: any = error.response.data.error;
                errors.forEach(element => {
                    const colunma: string = element.column as any
                    const mss: string = element.msserror as any
                    if (colunma === "msg.E002") {
                        notification.error({
                            message: msgE34,
                        });
                    }
                    if (colunma === "msg.E011") {
                        notification.error({
                            message: msgE30,
                        });
                    }
                });
            }
        )
    }

    /**
     * @overviews: funtion to clear values input
     */
    clear = () => {
        // check id undefined
        if ((this.props as any).match.params.id == undefined) {
            // reset data null for input
            this.formRef.current.setFieldsValue({
                user: {
                    id_class: '',
                    name_class: '',
                    mem_ber: '',
                }
            });
        } else {
            // set null for input 
            this.formRef.current.setFieldsValue({
                user: {
                    name_class: '',
                    mem_ber: '',
                }
            });
        }
    }
    /**
     * @overviews: funtion to update class
     * @param values 
     */
    updateClass = (values) => {
        // call api to server with value obj
        axios.post("http://localhost:8888/updateClass", {
            id: (this.props as any).match.params.id,
            malop: values.user.id_class,
            name_class: values.user.name_class,
            mem_ber: values.user.mem_ber,
        }).then(
            // show mesage success
            () => {
                notification.success({
                    message: msgE51,
                });
                setTimeout(() => {
                    window.location.href = URL;
                }, 1000);
            }
        ).catch(
            //handler errors 
            error => {
                const errors: any = error.response.data.error;
                errors.forEach(element => { // get all errors from Server
                    const colunma: string = element.column as any
                    const mss: string = element.msserror as any
                    if (colunma === "ID_invalite") { // check columa is Id_invalidate
                        notification.error({ // show mesage error
                            message: msgE32,
                        });
                        const { history } = this.props as any;
                        window.location.href = URL; // reload the page

                    }
                    if (colunma === "Name_Class") { // check volums id Name_Class
                        notification.error({ // Show mesage error
                            message: msgE30,
                        });
                    }
                    if (colunma === "msgE001") { // check colunma is msgE001
                        notification.error({ // show mesage error
                            message: msgE001,
                        });
                    }
                });
            }
        )
    }
    /**@overviews: funtion to check add or edit
     * 
     * @param values 
     */
    onFinish = (values: any) => {
        // check id undefined
        if ((this.props as any).match.params.id != undefined) {
            // update class
            this.updateClass(values)
        } else {
            //add class
            this.saveClass(values)
        }
    }
    render() {
        const a: boolean = (this.props as any).match.params.id == undefined ? false : true;
        const { leave } = this.state
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="page-wrap">
                    <Paner></Paner>
                    <div className="main-content">
                        <div className="cont main-content">
                            <Form
                                {...layout} name="nest-messages" onFinish={this.onFinish}
                                validateMessages={validateMessages}
                                initialValues={{
                                    id_class: 1,
                                    name_class: "foosdfsdfdsf"
                                }}
                                ref={this.formRef}
                            >
                                <Breadcrumb>
                                    <Breadcrumb.Item href="">
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="/">
                                        <UserOutlined />
                                        <span>List Class</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>{(this.props as any).match.params.id != undefined ? "Edit Class" : "Add Class"}</Breadcrumb.Item>
                                </Breadcrumb>
                                <Form.Item name={['user', 'id_class']} label="Class Code"
                                    rules={[
                                        { required: true }, {
                                            pattern: /((LT)|(DH))+([0-9]{5})\b/,
                                            message: "Class Code must be(LT|DH XXXXX)",
                                        },
                                        {
                                            max: 7,
                                            message: "Class Code must be <= 7 characters"
                                        },
                                    ]}>
                                    <Input readOnly={a} placeholder='Input code Class (LT|DH XXXXX)' />
                                </Form.Item>
                                <Form.Item name={['user', 'name_class']} label="Name class"
                                    rules={[
                                        {
                                            required: true
                                        },
                                        {
                                            pattern: /^[a-zA-Z0-9\s]*$/,
                                            message: "Name class is validate !!"
                                        }, {
                                            max: 49,
                                            message: "Name class max length must be <= 50 characters"
                                        },
                                    ]}>
                                    <Input placeholder='Input name class <= 50 characters' />
                                </Form.Item>
                                <Form.Item name={['user', 'mem_ber']} label="Member" rules={[
                                    { type: 'number', min: 1, max: 100, required: true },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: "Member must be the number !!"
                                    }

                                ]}>
                                    <InputNumber placeholder='Member' />
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                                    <Button type="primary" htmlType="submit" className="classSave">
                                        Submit
                                   </Button>
                                    <Button type="primary" className="Clear-button" onClick={() => this.clear()}>
                                        Clear
                                   </Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </div>
                    <Footer></Footer>
                </div>
                <Prompt
                    when={true}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
            </div>

        );
    }
}
export default ClassPage;