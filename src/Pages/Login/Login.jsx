import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import './login.css';
import { setLocalStorage, signin, tokenKey } from './Auth/Auth.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        
        try {
            const res = await signin(values);
            if (res && res?.data?.data?.tokens?.accessToken?.token) {
                setLocalStorage(tokenKey, res?.data?.data?.tokens?.accessToken?.token);
                console.log(res);
                message.success("Muvaffaqiyatli o'tildi");
                navigate('/');
            } else {
                message.error("Login yoki parol noto'g'ri");
            }
        } catch (err) {
            console.log(err);
            message.error("Login yoki parol noto'g'ri");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Form
                className="login-form"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Telefon raqam"
                    name="phone_number"
                    rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item
                    label="Parol"
                    name="password"
                    rules={[{ required: true, message: 'Iltimos, parolingizni kiriting!' }]}
                >
                    <Input.Password  />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Kirish
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Login;
