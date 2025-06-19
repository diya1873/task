import React, { useEffect, useState } from 'react';
import { Table, Tag, message } from 'antd';
import axios from 'axios';

const UserGroups = () => {
  const [data, setData] = useState([]);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://retailapi.futec-soft.com/UsersGroup/v1.0/GetAll',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transformed = response.data.Response.map((group, index) => ({
        key: index + 1,
        id: group.GroupId,
        nameAr: group.GroupArName,
        nameEn: group.GroupEnName,
        active: group.IsActive,
      }));

      setData(transformed);
    } catch (error) {
      message.error('فشل في تحميل مجموعات المستخدمين');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const columns = [
    {
      title: 'رقم المجموعة',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'اسم المجموعة (عربي)',
      dataIndex: 'nameAr',
      key: 'nameAr',
    },
    {
      title: 'اسم المجموعة (إنجليزي)',
      dataIndex: 'nameEn',
      key: 'nameEn',
    },
    {
      title: 'فعال',
      dataIndex: 'active',
      key: 'active',
      render: (active) =>
        active ? <Tag color="green">نعم</Tag> : <Tag color="red">لا</Tag>,
    },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <h2>مجموعات المستخدمين</h2>
      <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default UserGroups;
