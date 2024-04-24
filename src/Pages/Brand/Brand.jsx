import axios from "axios";
import { useEffect, useState } from "react"
import {getToken, host, tokenKey, urlimage } from "../Login/Auth/Auth";
import {Button, Form, Input, message, Modal, Table, Upload} from 'antd'
import { PlusOutlined } from "@ant-design/icons";

import { ExclamationCircleOutlined } from '@ant-design/icons';


export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  //   setCurrentItem(null);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };
  const getBrands =()=>{
    axios.get(`${host}/brands`).then((res)=>{     
      setBrands(res.data.data)
    }).catch((error)=>{
      console.log(error);
    })
  }
  const authToken = getToken(tokenKey);
  useEffect(()=>{
    getBrands();
  },[])

    // Handle form submission
    const handleOk = (values) => {
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
                  getBrands();
              } else {
                  message.error("Failed to save city");
              }
          })
          .catch(error => {
              console.error("Error processing request:", error);
              message.error("An error occurred while processing the request");
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
          axios.delete(`${host}/cities/${id}`, config)
              .then(res => {
                  if (res && res.data.success) {
                      message.success("User deleted successfully");
                      getBrands()
                  } else {
                      message.error("Failed to delete user");
                  }
              })
              .catch(error => {
                  console.error("Error deleting user:", error);
                  message.error("An error occurred while deleting user");
              });
      },
      onCancel() {
          console.log("Deletion canceled");
      },
  });
};


  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }
  ];

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

  const dataSource = brands.map((item,index) => ({
    key:item.id,
    number:index+1,
    name:item.title,
    images:(
      <img style={{width:'100px'}} src={`${urlimage}${item.image_src}`} alt={item.title} />
    ),
    action: (
      <>
        <Button style={{ marginRight: '20px' }} type="primary" onClick={() => editModal(item)}>Edit</Button>
        <Button type="primary" danger onClick={()=>deleteCity(item.id)}>Delete</Button>
      </>
    )
  }))

  const HandleAdd = (values) =>{
    const authToken = localStorage.getItem(tokenKey)
    const formData = new FormData();
    formData.append('title',values.name);   
    if (values.images && values.images.length > 0) {
      values.images.forEach((image) => {
          if (image && image.originFileObj) {
              formData.append('images', image.originFileObj, image.name);
          }
      });
  }
  axios({
    url:`${host}/brands`,
    method:"POST",
    data:formData,
    headers:{
      'Authorization': `Bearer ${authToken}`,
    }
  }).then(res=>{
    getBrands()
    setIsModalOpen(false)
    form.resetFields();
    message.success("Qo'shildi")

  }).catch(err=>{
    message.error("Xatolik")
  })
  }

  return (
    <div>
      <h1>Brand</h1>
      <Button onClick={showModal} type="primary">Add</Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form form={form} name="validateOnly" onFinish={handleOk} layout="vertical" autoComplete="off" onFinish={HandleAdd} >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
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
