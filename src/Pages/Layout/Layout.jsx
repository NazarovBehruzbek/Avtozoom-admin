import React, { useState } from 'react';
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UnorderedListOutlined,
    CarOutlined,
    HomeOutlined,
    OpenAIOutlined,
    EnvironmentOutlined,
    FileDoneOutlined,
    TableOutlined,
} from '@ant-design/icons';
import { Button, Layout as AntLayout, Menu } from 'antd';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { deleteLocalStorage, tokenKey } from '../Login/Auth/Auth';
import logo from "../../assets/logo.svg"
const { Header, Sider, Content, Footer } = AntLayout;

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [islogout, setIslogout] = useState(false);
    const location = useLocation();
    const logout = () => {
        deleteLocalStorage(tokenKey);
        setIslogout(true);
    };

    const menuItems = [
        {
            key: '1',
            icon: <UnorderedListOutlined />,
            label: <NavLink to="/">Categories</NavLink>,
        },
        {
            key: '2',
            icon: <FileDoneOutlined />,
            label: <NavLink to="/brand">Brands</NavLink>,
        },
        {
            key: '3',
            icon: <OpenAIOutlined />,
            label: <NavLink to="/cities">Cities</NavLink>,
        },
        {
            key: '4',
            icon: <EnvironmentOutlined />,
            label: <NavLink to="/locations">Locations</NavLink>,
        },
        {
            key: '5',
            icon: <CarOutlined />,
            label: <NavLink to="/cars">Cars</NavLink>,
        },
        {
            key: '6',
            icon: <TableOutlined />,
            label: <NavLink to="/models">Models</NavLink>,
        },
    ];
    const currentMenuKey = menuItems.find(item => location.pathname === item.label.props.to)?.key;
    return (
        <AntLayout style={{height:'100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" style={{ padding: '20px', color: '#fff' }}>
                    <img style={{width:"80%",height:'40px'}} src={logo} alt="Autoozom" />
                </div>
                <Menu theme="dark" mode="inline"   defaultSelectedKeys={[currentMenuKey]} items={menuItems} style={{ marginTop: '20px' }} />
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
                    {islogout && <Navigate to="/login" />}
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
                    <Button
                        onClick={logout}
                        style={{ position: 'absolute', right: '50px', marginTop: '14px' }}
                        icon={<LogoutOutlined />}
                    >
                        Chiqish
                    </Button>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                        borderRadius: '8px',
                        overflowY: 'scroll'
                    }}
                >
                    <Outlet />
                </Content>
              
                <p style={{paddingBottom:'20px',textAlign:'center'}}>© Created by LIMSA company 2024</p>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
