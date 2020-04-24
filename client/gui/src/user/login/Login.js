import React, { Component } from 'react';
import { login } from '../../utils/APIUtils';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Login extends Component {
    render() {

        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values) {
    console.log("Success");
        const data = Object.assign({}, values)
        const loginRequest = { "user": 
            {  
                "email":data.email,
                "password":data.password
            }
        };
        console.log(loginRequest)
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
        }).catch(error => {
            if(error.status === 401) {
                notification.error({
                    message: 'Sound Editor',
                    description: 'Your Username or Password is incorrect. Please try again!'
                });                    
            } else {
                console.log(error)
                notification.error({
                    message: 'Sound Editor',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });                                            
            }
        });
    }

    render() {
        return (
            <Form onFinish={this.onFinish} className="login-form">
                <Form.Item name="email"  rules={[{ required: true, message: 'Please input your username' }]}>
                    <Input 
                        prefix={ <UserOutlined />}
                        size="large"
                        name="Email" 
                        placeholder="Email" />    
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input 
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}


export default Login;