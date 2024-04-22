import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken, host, tokenKey, urlimage } from '../Login/Auth/Auth';
import { Button, Table, Form, Modal, Input, Upload, message, Select, Switch } from 'antd';
import "./style.css"
import { PlusOutlined } from '@ant-design/icons';

export default function Cars() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState([]);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const getCategory = () => {
    axios.get(`${host}/categories`)
      .then(response => {
        setCategory(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cities data:", error);
      });
  };

  const getBrand = () => {
    axios.get(`${host}/categories`)
      .then(response => {
        setCategory(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cities data:", error);
      });
  };
  const getModel = () => {
    axios.get(`${host}/categories`)
      .then(response => {
        setCategory(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cities data:", error);
      });
  };
  const getLocation = () => {
    axios.get(`${host}/categories`)
      .then(response => {
        setCategory(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cities data:", error);
      });
  };
  const getCity = () => {
    axios.get(`${host}/categories`)
      .then(response => {
        setCategory(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cities data:", error);
      });
  };

  useEffect(() => {
    getCategory();
    getBrand();
    getModel();
    getLocation();
    getCity();
  }, []);

  // Image file validation
  const beforeUpload = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isValidFile = allowedExtensions.includes(fileExtension);

    if (!isValidFile) {
      message.error('You can only upload JPG/JPEG/PNG files!');
    }

    return isValidFile;
  };

  // Handle file upload events
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  return (
    <div>
      <div className="all-pages">
        <h2>Cars</h2>
        <Button type='primary' onClick={showModal}>Add cities</Button>
      </div>
      <Modal
        title="Cars qo'shish"
        footer={null}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <Form.Item
            label="Category"
            name="Category"
            rules={[{ required: true, message: 'Please select a category!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Category">
              {category.map(item => (
                <Select.Option key={item.value} value={item.value} disabled={item.disabled}>
                  {item.name_en}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>            <Form.Item
            label="Brand"
            name="Brand"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Brand" />
          </Form.Item>
          <Form.Item
            label="Model"
            name="Model"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%' }}
          >
            <Select placeholder="Select Model" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="Location"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Location" />
          </Form.Item>
          <Form.Item
            label="City"
            name="City"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select City" />
          </Form.Item>
          <Form.Item
            name="Color"
            label="Color"
            rules={[{ required: true, message: 'Please enter the name' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Yil"
            label="Yil"
            rules={[{ required: true, message: 'Please enter the year' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Secpnds"
            label="Color"
            rules={[{ required: true, message: 'Please enter the color' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Speed"
            label="Speed"
            rules={[{ required: true, message: 'Please enter the speed' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Max People"
            label="Max People"
            rules={[{ required: true, message: 'Please enter the max people' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Motor"
            label="Motor"
            rules={[{ required: true, message: 'Please enter the motor' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Transmission"
            label="Transmission"
            rules={[{ required: true, message: 'Please enter the transmission' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Drive Side"
            label="Drive Side"
            rules={[{ required: true, message: 'Please enter the drive side' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Yoqilg'i"
            label="Yoqilg'i"
            rules={[{ required: true, message: 'Please enter the yoqilg\'i' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Limit Per Day"
            label="Limit Per Day"
            rules={[{ required: true, message: 'Please enter the limit per day' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Deposit"
            label="Deposit"
            rules={[{ required: true, message: 'Please enter the deposit' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Premium Protection Price"
            label="Premium Protection Price"
            rules={[{ required: true, message: 'Please enter the premium protection price' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price in AED"
            label="Price in AED"
            rules={[{ required: true, message: 'Please enter the price in AED' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price in USD(Otd)"
            label="Price in USD(Otd)"
            rules={[{ required: true, message: 'Please enter the price in USD(Otd)' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price in AED (Otd)"
            label="Price in AED (Otd)"
            rules={[{ required: true, message: 'Please enter the price in AED (Otd)' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price in USD"
            label="Price in USD"
            rules={[{ required: true, message: 'Please enter the price in USD' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Inclusive"
            label="Inclusive"
            rules={[{ required: true, message: 'Please enter the price in USD' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item
            name="images"
            label="Upload car images"
            rules={[{ required: true, message: 'Please upload images' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok")
              }}
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="mainimage"
            label="Upload the main image"
            rules={[{ required: true, message: 'Please upload the main image' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok")
              }}
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item style={{ flex: '0 0 100%' }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}
