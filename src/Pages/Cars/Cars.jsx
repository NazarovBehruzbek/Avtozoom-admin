import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken, host, tokenKey, urlimage } from '../Login/Auth/Auth';
import { Button, Table, Form, Modal, Input, Upload, message, Select, Switch } from 'antd';
import "./style.css"
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function Cars() {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [cars, setCars] = useState([])
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState([]);
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setCurrentItem(null);
  };
  const getCars = () => {
    axios.get(`${host}/cars`)
      .then(response => {
        setCars(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getCategory = () => {
    axios.get(`${host}/categories`)
      .then(response => {
        setCategory(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cars data:", error);
      });
  };

  const getBrand = () => {
    axios.get(`${host}/brands`)
      .then(response => {
        setBrand(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getModel = () => {
    axios.get(`${host}/models`)
      .then(response => {
        setModel(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getLocation = () => {
    axios.get(`${host}/locations`)
      .then(response => {
        setLocation(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getCity = () => {
    axios.get(`${host}/cities`)
      .then(response => {
        setCity(response?.data?.data);
      })
      .catch(error => {
        console.error("Error fetching cars data:", error);
      });
  };

  useEffect(() => {
    getCars();
    getCategory();
    getBrand();
    getModel();
    getLocation();
    getCity();
  }, []);

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

  const handleOk = (values) => {
    setloading(true);
    const formData = new FormData();
    const inclusiveValue = values.inclusive;
    formData.append('brand_id', values.brand_id);
    formData.append('model_id', values.model_id);
    formData.append('city_id', values.city_id);
    formData.append('color', values.color);
    formData.append('year', values.year);
    formData.append('seconds', values.seconds);
    formData.append('category_id', values.category_id);
    if (values.images1 && values.images1.length > 0) {
      values.images1.forEach((image) => {
        if (image && image.originFileObj) {
          formData.append('images', image.originFileObj, image.name);
        }
      });
    }
    if (values.images2 && values.images2.length > 0) {
      values.images2.forEach((image) => {
        if (image && image.originFileObj) {
          formData.append('images', image.originFileObj, image.name);
        }
      });
    }
    formData.append('max_speed', values.max_speed);
    formData.append('max_people', values.max_people);
    formData.append('transmission', values.transmission);
    formData.append('motor', values.motor);
    formData.append('drive_side', values.drive_side);
    formData.append('petrol', values.petrol);
    formData.append('limitperday', values.limitperday);
    formData.append('deposit', values.deposit);
    formData.append('premium_protection', values.premium_protection);
    formData.append('price_in_aed', values.price_in_aed);
    formData.append('price_in_usd', values.price_in_usd);
    formData.append('price_in_aed_sale', values.price_in_aed_sale);
    formData.append('price_in_usd_sale', values.price_in_usd_sale);
    formData.append('location_id', values.location_id);
    formData.append('inclusive', inclusiveValue ? 'false' : 'true');
    if (values.cover && values.cover.length > 0) {
      values.cover.forEach((image) => {
        if (image && image.originFileObj) {
          formData.append('cover', image.originFileObj, image.name);
        }
      });
    }

    const url = currentItem ? `${host}/cars/${currentItem.id}` : `${host}/cars`;
    const method = currentItem ? 'PUT' : 'POST';
    const authToken = getToken(tokenKey);

    axios({
      url: url,
      method: method,
      data: formData,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response && response.data) {
          message.success(currentItem ? "Cars updated successfully" : "Cars added successfully");
          handleCancel();
          getCars();
        } else {
          message.error("Failed to save cars");
        }
      })
      .catch(error => {
        console.error("Error processing request:", error);
        message.error("An error occurred while processing the request");
      })
      .finally(()=>{
        setloading(false)
      })
  };
  const deleteCars = (id) => {
    const authToken = getToken(tokenKey);
    const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    }
    Modal.confirm({
        title: 'Are you sure you want to delete this cars?',
        icon: <ExclamationCircleOutlined/>,
        okText: 'Yes',
        cancelText: 'No',
        onOk() {
          setloading(true)
            axios.delete(`${host}/cars/${id}`, config)
                .then(res => {
                    if (res && res.data.success) {
                        message.success("Cars deleted successfully");
                       getCars()
                    } else {
                        message.error("Failed to delete cars");
                    }
                })
                .catch(error => {
                    console.error("Error deleting cars:", error);
                    message.error("An error occurred while deleting cars");
                })
                .finally(()=>{
                  setloading(false)
                })
        },
        onCancel() {
            console.log("Deletion canceled");
        },
    });
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Rangi',
      dataIndex: 'rangi',
      key: 'rangi',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Kategoriya',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Lokatsiya',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const dataSource = cars.map((item, index) => ({
    key: item.id,
    number: index + 1,
    rangi: item.color,
    brand: item.brand.title,
    model: item.model.name,
    category: item.category.name_en,
    location: item.location.name,
    action: (
      <>
        <Button style={{ marginRight: '20px' }} type="primary" onClick={() => editModal(item)}>Edit</Button>
        <Button type="primary" danger onClick={() => deleteCars(item.id)}>Delete</Button>
      </>
    )
  }));

  return (
    <div>
      <div className="all-pages">
        <h2>Cars</h2>
        <Button type='primary' onClick={showModal}>Add cities</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Cars qo'shish"
        footer={null}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} onFinish={handleOk}>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: 'Please select a category!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Category">
              {category.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name_en}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Brand">
              {brand.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="model_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%' }}
          >
            <Select placeholder="Select Model">
              {model.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Location" >
              {location.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name="city_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select City">
              {city.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please enter the name' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Yil"
            rules={[{ required: true, message: 'Please enter the year' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seconds"
            label="Seconds"
            rules={[{ required: true, message: 'Please enter the color' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="max_speed"
            label="Speed"
            rules={[{ required: true, message: 'Please enter the speed' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="max_people"
            label="Max People"
            rules={[{ required: true, message: 'Please enter the max people' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="motor"
            label="Motor"
            rules={[{ required: true, message: 'Please enter the motor' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="transmission"
            label="Transmission"
            rules={[{ required: true, message: 'Please enter the transmission' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="drive_side"
            label="Drive Side"
            rules={[{ required: true, message: 'Please enter the drive side' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="petrol"
            label="Yoqilg'i"
            rules={[{ required: true, message: 'Please enter the yoqilg\'i' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="limitperday"
            label="Limit Per Day"
            rules={[{ required: true, message: 'Please enter the limit per day' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="deposit"
            label="Deposit"
            rules={[{ required: true, message: 'Please enter the deposit' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="premium_protection"
            label="Premium Protection Price"
            rules={[{ required: true, message: 'Please enter the premium protection price' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_aed"
            label="Price in AED"
            rules={[{ required: true, message: 'Please enter the price in AED' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_usd"
            label="Price in USD(Otd)"
            rules={[{ required: true, message: 'Please enter the price in USD(Otd)' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_aed_sale"
            label="Price in AED (Otd)"
            rules={[{ required: true, message: 'Please enter the price in AED (Otd)' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_usd_sale"
            label="Price in USD"
            rules={[{ required: true, message: 'Please enter the price in USD' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inclusive"
            label="Inclusive"
            style={{ flex: '0 0 15%', paddingRight: '8px' }}
          >
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item
            name="images1"
            label="Upload car images"
            rules={[{ required: true, message: 'Please upload images' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 25%', paddingRight: '8px' }}
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
            name="images2"
            label="Upload the main image"
            rules={[{ required: true, message: 'Please upload the main image' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 25%', paddingRight: '8px' }}
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
            name="cover"
            label="Upload the main image"
            rules={[{ required: true, message: 'Please upload the main image' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 25%', paddingRight: '8px' }}
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}
