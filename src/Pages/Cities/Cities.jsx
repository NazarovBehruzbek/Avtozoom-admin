import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken, host, tokenKey, urlimage } from '../Login/Auth/Auth';
import { Button, Table, Form, Modal, Input, Upload, message } from 'antd';
import "./style.css"
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    axios.get(`${host}/cities`)
      .then(response => {
        setCities(response.data.data);
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching cities data:", error);
        message.error("Failed to fetch cities data");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setCurrentItem(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  // Handle form submission
  const handleOk = (values) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('text', values.text);

    if (values.images && values.images.length > 0) {
        values.images.forEach((image) => {
            if (image && image.originFileObj) {
                formData.append('images', image.originFileObj, image.name);
            }
        });
    }

    const url = currentItem ? `${host}/cities/${currentItem.id}` : `${host}/cities`;
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
                message.success(currentItem ? "City updated successfully" : "City added successfully");
                handleCancel();
                getData();
            } else {
                message.error("Failed to save city");
            }
        })
        .catch(error => {
            console.error("Error processing request:", error);
            message.error("An error occurred while processing the request");
        })
        .finally(() => {
          setLoading(false); 
      });
};

 // Function to prepare data for editing
  const editModal = (item) => {
    setIsModalOpen(true);
    form.setFieldsValue({
        name: item.name,
        text: item.text,
        images: [{ uid: item.id, name: 'image', status: 'done', url: `${urlimage}${item.image_src}` }], 
    });
    setCurrentItem(item);
};

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
};

// Delete function 
const deleteCity = (id) => {
  const authToken = getToken(tokenKey);
  const config = {
      headers: {
          'Authorization': `Bearer ${authToken}`
      }
  }
  Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined/>,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        setLoading(true)
          axios.delete(`${host}/cities/${id}`, config)
              .then(res => {
                  if (res && res.data.success) {
                      message.success("User deleted successfully");
                     getData()
                  } else {
                      message.error("Failed to delete user");
                  }
              })
              .catch(error => {
                  console.error("Error deleting user:", error);
                  message.error("An error occurred while deleting user");
              })
              .finally(() => {
                setLoading(false); 
            });
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
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name_',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const dataSource = cities.map((item, index) => ({
    key: item.id,
    number: index + 1,
    images: (
      <img style={{ width: "70px", height: '70px'}} src={`${urlimage}${item.image_src}`} alt="Error" />
    ),
    name: item.name,
    text: item.text,
    action: (
      <>
        <Button style={{ marginRight: '20px' }} type="primary" onClick={() => editModal(item)}>Edit</Button>
        <Button type="primary" danger onClick={()=>deleteCity(item.id)}>Delete</Button>
      </>
    )
  }));

  return (
    <div>
      <div className="all-pages">
        <h2>Cities</h2>
        <Button type='primary' onClick={showModal}>Add cities</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} loading={loading}/>
      <Modal title={currentItem?"Tahrirlash":"Qo'shish"} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={handleOk}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Please enter the text' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Upload Image" name="images" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload an image' }]}>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
