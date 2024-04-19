import React, { useState } from 'react';
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout as AntLayout, Menu } from 'antd';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { deleteLocalStorage, tokenKey } from '../Login/Auth/Auth';

const { Header, Sider, Content } = AntLayout;

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [islogout, setIslogout] = useState(false);

    const logout = () => {
        deleteLocalStorage(tokenKey);
        setIslogout(true)

    }

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <NavLink to="/">Dashboard</NavLink>,
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <NavLink to="/">Categories</NavLink>,
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: <NavLink to="/brand">Brand</NavLink>,
        },
    ];

    return (
        <AntLayout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" style={{ padding: '16px', color: '#fff' }}>
                    Logo
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} style={{ marginTop: '20px' }} />
            </Sider>
            <AntLayout>
                <Header
                    style={{
                        padding: 0,
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                    }}

                >
                    {
                        islogout ?
                            <Navigate to="/login" /> : ''
                    }
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            marginLeft: '16px',
                        }}
                    />
                        <Button onClick={logout}  style={{position:'absolute',right:'50px',marginTop:'14px'}} icon={<LogoutOutlined/>}>Chiqish</Button>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                        borderRadius: '8px',
                    }}
                >
                    <Outlet />
                </Content>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
