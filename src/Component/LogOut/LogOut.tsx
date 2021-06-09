
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios';

// config layout
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
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
export const LogOut = (props) => {
  /**
   *  overviews:funtion to check check account in DB
   * @param values 
   */
  const onFinish = (values) => {
    // call api to server to check account correct
    axios.post(`http://localhost:8888/checkAccount`, {
      user_name: values.username,
      password: values.password
    })
      .then(
        // handler result here
        (result) => {
          // check data rq is msg.E004
          if (result.data.data == "msg.E004") {
            // show message error
            Modal.error({
              content: 'UserName or password incorrect',
            });
          } else {
            // show message success
            Modal.success({
              content: 'Login success !!',
            });
            // to home student
            const { history } = props as any;
            history.push('/Home');
          }
        },
        (error) => {
          console.log("Error: " + error);
        },
      )
  };

  return (

    <div className="wrapper">

      <div className="page-wrap">

        <div className="main-content">
          <div className="cont main-content">
            <Form
              {...layout}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
            </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
            </Button>
            Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>

      </div>
    </div>
  );
};

