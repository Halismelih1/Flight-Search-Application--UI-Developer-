import React from 'react';
import { Layout, Typography, Row, Col, Space, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header style={{ background: '#fff',marginBottom:"30px", padding: '0 20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: 1 }}>
      <Row justify="space-between" align="middle" style={{ height: '100%' }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>Flight Search Application</Title>
        </Col>
        <Col>
          <Space>
          <Avatar size="medium" icon={<ShoppingCartOutlined />} style={{ cursor: 'pointer',background:"white",color:"black" }} />
            <Avatar size="medium" icon={<UserOutlined />} style={{ cursor: 'pointer',background:"white",color:"black" }} />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
