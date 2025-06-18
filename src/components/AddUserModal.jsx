// src/components/AddUserModal.jsx
import React, { useState } from 'react';
import { Modal, Input, Select, Checkbox, Form, Button } from 'antd';

const { Option } = Select;

const AddUserModal = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSave(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="إضافة مستخدم جديد"
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ active: true }}
      >
        <Form.Item
          label="رقم المستخدم"
          name="userNo"
          rules={[{ required: true, message: 'رقم المستخدم مطلوب' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="اسم المستخدم"
          name="username"
          rules={[{ required: true, message: 'اسم المستخدم مطلوب' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[{ required: true, message: 'كلمة المرور مطلوبة' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="مجموعة المستخدم"
          name="group"
          rules={[{ required: true, message: 'مجموعة المستخدم مطلوبة' }]}
        >
          <Select>
            <Option value="System">System</Option>
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="الفرع"
          name="branch"
          rules={[{ required: true, message: 'الفرع مطلوب' }]}
        >
          <Select>
            <Option value="عمان">عمان</Option>
            <Option value="إربد">إربد</Option>
            <Option value="الزرقاء">الزرقاء</Option>
          </Select>
        </Form.Item>

        <Form.Item name="active" valuePropName="checked">
          <Checkbox>فعال</Checkbox>
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button danger onClick={() => form.resetFields()}>
              تفريغ الحقول
            </Button>
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
