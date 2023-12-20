// FlightList.jsx

import React from 'react';
import flights from '../Data/db';
import { Table, Space } from 'antd';
import { DollarCircleOutlined, ScheduleOutlined, AimOutlined, GlobalOutlined } from '@ant-design/icons';

const FlightList = ({ searchCriteria }) => {
  // Uçuşları filtrele
  const filteredFlights = flights.filter((flight) => {
    // Kullanıcının en az bir şehir ve bir tarih girmesi gerekiyor
    if (
      (searchCriteria.departureCity && flight.departureCity.toLowerCase().includes(searchCriteria.departureCity.toLowerCase())) ||
      (searchCriteria.arrivalCity && flight.arrivalCity.toLowerCase().includes(searchCriteria.arrivalCity.toLowerCase())) ||
      (searchCriteria.departureDate && flight.departureDate === searchCriteria.departureDate.format('YYYY-MM-DD'))
    ) {
      return true;
    }
    return false;
  });

  const columns = [
    {
      title: 'Kuyruk Numarası',
      dataIndex: 'aircraftRegistration',
      key: 'aircraftRegistration',
    },
    {
      title: 'Havayolu',
      dataIndex: 'airline',
      key: 'airline',
    },
    {
      title: 'Kalkış Şehri',
      dataIndex: 'departureCity',
      key: 'departureCity',
    },
    {
      title: 'Varış Şehri',
      dataIndex: 'arrivalCity',
      key: 'arrivalCity',
    },
    {
      title: 'Kalkış Tarihi',
      dataIndex: 'departureDate',
      key: 'departureDate',
    },
    {
      title: 'Varış Tarihi',
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
    },
    {
      title: 'Kalkış Saati',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: 'Varış Saati',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Space><DollarCircleOutlined />{text}</Space>,
    },
    {
      title: 'Diğer Detaylar',
      key: 'details',
      render: (text, record) => (
        <Space size="middle">
          <a href="#">Detayları Göster</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Uygun Uçuşlar</h2>
      <Table dataSource={filteredFlights} columns={columns} />
    </div>
  );
};

export default FlightList;
