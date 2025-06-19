import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const Branches = () => {
  const [data, setData] = useState([]);

  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://retailapi.futec-soft.com/Branches/v1.0/GetAll',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transformed = response.data.Response.map((branch, index) => ({
        key: index + 1,
        id: branch.BranchId,
        nameAr: branch.BranchNameAr,
        nameEn: branch.BranchNameEn,
        taxId: branch.TaxId,
        phones: branch.Phones,
        mobiles: branch.Mobiles,
        website: branch.Website,
        email: branch.Email,
        address: branch.Address,
        city: branch.City,
        street: branch.Street,
      }));

      setData(transformed);
    } catch (error) {
      message.error('فشل في تحميل الفروع');
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const columns = [
    {
      title: 'رقم الفرع',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'اسم الفرع (عربي)',
      dataIndex: 'nameAr',
      key: 'nameAr',
    },
    {
      title: 'اسم الفرع (إنجليزي)',
      dataIndex: 'nameEn',
      key: 'nameEn',
    },
    {
      title: 'الرقم الضريبي',
      dataIndex: 'taxId',
      key: 'taxId',
    },
    {
      title: 'الهاتف',
      dataIndex: 'phones',
      key: 'phones',
    },
    {
      title: 'الموبايل',
      dataIndex: 'mobiles',
      key: 'mobiles',
    },
    {
      title: 'الموقع الإلكتروني',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'العنوان',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'المدينة',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'الشارع',
      dataIndex: 'street',
      key: 'street',
    },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <h2>الفروع</h2>
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

export default Branches;