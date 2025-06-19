import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, message } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import AddUserModal from '../components/AddUserModal';
import axios from 'axios';

function Users() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
const token = localStorage.getItem('token');
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://retailapi.futec-soft.com/Users/v1.0/GetAll',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transformed = response.data.Response.map((user, index) => ({
        key: index + 1,
        userNo: user.UserNo,
        username: user.UserName,
        branch: user.BranchDesc,
        group: user.GroupArName,
        active: user.IsActive,
      }));

      setData(transformed);
    } catch (error) {
      message.error('فشل في تحميل المستخدمين');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    const filtered = data.filter(
      (user) =>
        user.username.includes(value) ||
        user.userNo.toString().includes(value)
    );
    setData(filtered);
  };

  const handleAddUser = (user) => {
    const newUser = {
      key: data.length + 1,
      ...user,
    };
    setData([...data, newUser]);
  };

  const columns = [
    {
      title: 'رقم المستخدم',
      dataIndex: 'userNo',
      key: 'userNo',
    },
    {
      title: 'اسم المستخدم',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'الفرع',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'اسم المجموعة',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'فعال',
      dataIndex: 'active',
      key: 'active',
      render: (active) =>
        active ? <Tag color="green">نعم</Tag> : <Tag color="red">لا</Tag>,
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => console.log('تعديل', record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log('حذف', record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          rowGap: '12px',
          columnGap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined style={{ color: 'red', fontSize: '20px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>قائمة المستخدمين</h2>
        </div>

        <Input.Search
          placeholder="ابحث عن مستخدم..."
          onSearch={handleSearch}
          style={{ flex: '1 1 250px', maxWidth: '300px' }}
          allowClear
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ whiteSpace: 'nowrap' }}
          onClick={() => setIsModalOpen(true)}
        >
          إضافة مستخدم
        </Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <AddUserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
}

export default Users;
