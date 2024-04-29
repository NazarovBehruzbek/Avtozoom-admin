import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Image, Modal, Input, Upload, message } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./Categories.css";
import { urlimage } from "../Login/Auth/Auth";
import Item from "antd/es/list/Item";

export default function Categories() {
  const [dataCars, setDateCars] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(false);

  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [id, setId] = useState(null);
  const MyFormItemContext = React.createContext([]);
  function toArr(str) {
    return Array.isArray(str) ? str : [str];
  }
  const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(
      () => [...prefixPath, ...toArr(prefix)],
      [prefixPath, prefix]
    );
    return (
      <MyFormItemContext.Provider value={concatPath}>
        {children}
      </MyFormItemContext.Provider>
    );
  };
  const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName =
      name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
  };
  const beforeUpload = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isValidFile = allowedExtensions.includes(fileExtension);

    if (!isValidFile) {
      message.error("You can only upload JPG/JPEG/PNG files!");
    }

    return isValidFile;
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const showModal = () => {
    setIsModalOpen(true);
    form1.resetFields();
  };

  const getItems = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((response) => setDateCars(response?.data?.data));
  };

  const handleOk = (event) => {
    console.log("Handle OK---", event);
    const formData = new FormData();
    formData.append("name_en", event.user.name.name_uz);
    formData.append("name_ru", event.user.name.name_ru);
    formData.append(
      "images",
      event.user.images[0].originFileObj,
      event.user.images[0].name
    );

    axios({
      url: "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("new_token")}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response?.status == 201) {
        setIsModalOpen(false);
        message.success("Car added successfully");
        getItems();
        handleCancel(false);
      } else {
        message.error("Respose is bed, Try Again");
      }
    });
  };
  const delateCar = (id) => {
    console.log(id);
    const authToken = localStorage.getItem("new_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    Modal.confirm({
      title: "Are you sure you want to delete this Car?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        axios
          .delete(
            `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
            config
          )
          .then((res) => {
            if (res && res?.data?.success) {
              message.success("User deleted successfully");
              getItems();
            } else {
              message.error("Failed to delete user");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            message.error("An error occurred while deleting user");
          });
      },
      onCancel() {
        console.log("Deletion canceled");
      },
    });
  };

  // Edit function  things.............................

  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const showEditModal = (item) => {
    setId(item.id);
    setImageSrc(item.image_src);
    console.log("ShoweditModl --- ", item);
    setIsModalEditOpen(true);
    form.setFieldsValue({
      name_uz: item.name_en,
      name_ru: item.name_ru,
      images1: [
        {
          uid: item.id,
          name: "image",
          status: "done",
          url: `${urlimage}${item.image_src}`,
        },
      ],
    });
  };
  const handleEditOk = (event) => {
    const formData1 = new FormData();
    console.log("Event --- ", event);
    formData1.append("name_en", event.name_uz);
    formData1.append("name_ru", event.name_ru);
    if (event.images1 && event.images1.length > 0) {
      event.images1.forEach((image) => {
        if (image && image.originFileObj) {
          console.log(image.originFileObj, image.name);
          formData1.append("images", image.originFileObj, image.name);
        }
      });
    }
    console.log(formData1);
    axios({
      url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
      method: "PUT",
      data: formData1,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("new_token")}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response?.status == 200) {
        setIsModalEditOpen(false)
        console.log("Respose--- ",response);
        message.success("Car Editted successfully");
        getItems();
      } else {
        message.error("Respose is bed, Try Again");
      }
    });
  };
  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="categories">
      <div className="categories_box">
        <div className="categories_btn">
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Cars Adds"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form1}
              name="form_item_path"
              layout="vertical"
              onFinish={handleOk}
            >
              <MyFormItemGroup prefix={["user"]}>
                <MyFormItemGroup prefix={["name"]}>
                  <MyFormItem
                    name="name_uz"
                    label="Name Uz"
                    customRequest={({ onSuccess }) => {
                      onSuccess("ok");
                    }}
                  >
                    <Input />
                  </MyFormItem>
                  <MyFormItem
                    name="name_ru"
                    label="Name Ru"
                    customRequest={({ onSuccess }) => {
                      onSuccess("ok");
                    }}
                  >
                    <Input />
                  </MyFormItem>
                </MyFormItemGroup>
                <MyFormItem
                  name="images"
                  label="Images"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    { required: true, message: "Please upload an image" },
                  ]}
                >
                  <Upload
                    customRequest={({ onSuccess }) => {
                      onSuccess("ok");
                    }}
                    beforeUpload={beforeUpload}
                    listType="picture-card"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </MyFormItem>
              </MyFormItemGroup>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Modal>
        </div>
        <div className="categories_items">
          {dataCars.map((item, i) => (
            <div className="categories_item" key={i}>
              <img src={`${urlimage}${item.image_src}`} alt="img" />
              <div className="categories_titles">
                <h5><span>En: </span>{item.name_en}</h5>
                <h5><span>Ru: </span>{item.name_ru}</h5>
              </div>
              <div className="categories_item-btn">
                <Button
                  type="primary"
                  danger
                  onClick={() => showEditModal(item)}
                >
                  Edit
                </Button>
                <Modal
                  title="Edit Modal"
                  open={isModalEditOpen}
                  footer={null}
                  style={{ opacity: "gray" }}
                >
                  <Form
                    name="basic"
                    onFinish={handleEditOk}
                    onCancel={handleEditCancel}
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                    form={form}
                  >
                    <Form.Item
                      label="Name_UZ"
                      name="name_uz"
                      rules={[
                        {
                          required: true,
                          message: "Please input Car name_uz!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Name_RU"
                      name="name_ru"
                      rules={[
                        {
                          required: true,
                          message: "Please input Car name_ru!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Change Image"
                      name="images1"
                      rules={[
                        {
                          required: true,
                          message: "Please input Car Images!",
                        },
                      ]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        customRequest={({ onSuccess }) => {
                          onSuccess("ok");
                        }}
                        beforeUpload={beforeUpload}
                        listType="picture-card"
                      >
                        <div>
                          <PlusOutlined />
                          {/* <Image src={`${urlimage}${item.image_src}`} alt="img" /> */}
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
                <Button
                  type="primary"
                  danger
                  onClick={() => delateCar(item.id)}
                >
                  Delate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
