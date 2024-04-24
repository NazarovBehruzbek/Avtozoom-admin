import { Button, Form } from 'antd'
import React from 'react'

export default function Locations() {
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setCurrentItem(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };
  return (
    <div>
       <div className="all-pages">
        <h2>Cities</h2>
        <Button type='primary' onClick={showModal}>Add cities</Button>
      </div>

    </div>
  )
}
