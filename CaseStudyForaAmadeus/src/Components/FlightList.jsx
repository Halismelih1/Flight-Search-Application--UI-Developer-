// FlightList.jsx

import React, { useState, useEffect } from 'react';
import { Table, Space, Spin } from 'antd';
import { DollarCircleOutlined, AimOutlined, ClockCircleOutlined } from '@ant-design/icons';
import flights from '../Data/db';

const FlightList = ({ searchCriteria }) => {
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    // Simualation Api Fetching
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const filteredData = flights.filter((flight) => {
          if (
            (searchCriteria.departureCity && flight.departureCity.toLowerCase().includes(searchCriteria.departureCity.toLowerCase())) ||
            (searchCriteria.arrivalCity && flight.arrivalCity.toLowerCase().includes(searchCriteria.arrivalCity.toLowerCase())) ||
            (searchCriteria.departureDate && flight.departureDate === searchCriteria.departureDate.format('YYYY-MM-DD'))
          ) {
            return true;
          }
          return false;
        });

        setFilteredFlights(filteredData);
        setLoading(false);
      }, 1000); 
    };

    fetchData();
  }, [searchCriteria]);

  const columns = [
    {
      title: 'Kuyruk Numarası',
      dataIndex: 'aircraftRegistration',
      key: 'aircraftRegistration',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Havayolu',
      dataIndex: 'airline',
      key: 'airline',
      sorter: (a, b) => a.airline.localeCompare(b.airline),
      sortOrder: sortedInfo.columnKey === 'airline' && sortedInfo.order,
    },
    {
      title: 'Kalkış Şehri',
      dataIndex: 'departureCity',
      key: 'departureCity',
      sorter: (a, b) => a.departureCity.localeCompare(b.departureCity),
      sortOrder: sortedInfo.columnKey === 'departureCity' && sortedInfo.order,
    },
    {
      title: 'Varış Şehri',
      dataIndex: 'arrivalCity',
      key: 'arrivalCity',
      sorter: (a, b) => a.arrivalCity.localeCompare(b.arrivalCity),
      sortOrder: sortedInfo.columnKey === 'arrivalCity' && sortedInfo.order,
    },
    {
      title: 'Kalkış Tarihi',
      dataIndex: 'departureDate',
      key: 'departureDate',
      sorter: (a, b) => a.departureDate.localeCompare(b.departureDate),
      sortOrder: sortedInfo.columnKey === 'departureDate' && sortedInfo.order,
    },
    {
      title: 'Kalkış Saati',
      dataIndex: 'departureTime',
      key: 'departureTime',
      sorter: (a, b) => a.departureTime.localeCompare(b.departureTime),
      sortOrder: sortedInfo.columnKey === 'departureTime' && sortedInfo.order,
    },
    {
      title: 'Varış Tarihi',
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
      sorter: (a, b) => a.arrivalDate.localeCompare(b.arrivalDate),
      sortOrder: sortedInfo.columnKey === 'arrivalDate' && sortedInfo.order,
    },
    {
      title: 'Varış Saati',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      sorter: (a, b) => a.arrivalTime.localeCompare(b.arrivalTime),
      sortOrder: sortedInfo.columnKey === 'arrivalTime' && sortedInfo.order,
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Space><DollarCircleOutlined />{text}</Space>,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
    },
    {
      title: 'Uçuş Süresi',
      key: 'flightDuration',
      render: (text, record) => (
        <Space>
          <ClockCircleOutlined />{calculateFlightDuration(record.departureTime, record.arrivalTime)}
        </Space>
      ),
      sorter: (a, b) => calculateFlightDuration(a.departureTime, a.arrivalTime) - calculateFlightDuration(b.departureTime, b.arrivalTime),
      sortOrder: sortedInfo.columnKey === 'flightDuration' && sortedInfo.order,
    },
  ];

  const calculateFlightDuration = (departureTime, arrivalTime) => {
    const depTime = new Date(`2023-01-01 ${departureTime}`);
    const arrTime = new Date(`2023-01-01 ${arrivalTime}`);
    const durationInMinutes = (arrTime - depTime) / (1000 * 60);
    return durationInMinutes;
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  return (
    <div>
      <h2>Uygun Uçuşlar</h2>
      <Spin spinning={loading} tip="Yükleniyor...">
        <Table
          dataSource={filteredFlights}
          columns={columns}
          onChange={handleChange}
        />
      </Spin>
    </div>
  );
};

export default FlightList;








