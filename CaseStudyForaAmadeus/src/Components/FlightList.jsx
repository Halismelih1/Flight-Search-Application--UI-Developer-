// FlightList.jsx

import React, { useState, useEffect } from 'react';
import { Table, Space, Spin } from 'antd';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import flights from '../Data/db';

const FlightList = ({ searchCriteria }) => {
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    //  Api Fetching Simualation
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
      title: 'Code',
      dataIndex: 'aircraftRegistration',
      key: 'aircraftRegistration',
    },
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
      
    },
    {
      title: 'Departure City',
      dataIndex: 'departureCity',
      key: 'departureCity',
     
    },
    {
      title: 'Arrival City',
      dataIndex: 'arrivalCity',
      key: 'arrivalCity',
     
    },
    {
      title: 'Departure Date',
      dataIndex: 'departureDate',
      key: 'departureDate',
      sorter: (a, b) => new Date(a.departureDate) - new Date(b.departureDate),
      sortOrder: sortedInfo.columnKey === 'departureDate' && sortedInfo.order,
    },
    {
      title: 'Departure Time',
      dataIndex: 'departureTime',
      key: 'departureTime',
      sorter: (a, b) => new Date(`2023-01-01 ${a.departureTime}`) - new Date(`2023-01-01 ${b.departureTime}`),
      sortOrder: sortedInfo.columnKey === 'departureTime' && sortedInfo.order,
    },
    {
      title: 'Arrival Date',
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
      sorter: (a, b) => a.arrivalDate.localeCompare(b.arrivalDate),
      sortOrder: sortedInfo.columnKey === 'arrivalDate' && sortedInfo.order,
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      sorter: (a, b) => a.arrivalTime.localeCompare(b.arrivalTime),
      sortOrder: sortedInfo.columnKey === 'arrivalTime' && sortedInfo.order,
    },
    {
      title: 'Flight Duration',
      key: 'flightDuration',
      render: (record) => (
        <Space>
          <ClockCircleOutlined />{calculateFlightDuration(record.departureTime, record.arrivalTime)}
        </Space>
      ),
      sorter: (a, b) => calculateFlightDuration(a.departureTime, a.arrivalTime) - calculateFlightDuration(b.departureTime, b.arrivalTime),
      sortOrder: sortedInfo.columnKey === 'flightDuration' && sortedInfo.order,
    },
    
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Space><DollarCircleOutlined />{text}</Space>,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
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
      <h2 style={{ color: 'green', marginBottom: '20px',textAlign:"center" }}>Available Flights List</h2>
      <Spin spinning={loading} tip="Yükleniyor...">
        <Table
          dataSource={filteredFlights}
          columns={columns}
          onChange={handleChange}
          scroll={{ x: 'max-content' }}
          rowKey="id"
        />
      </Spin>
    </div>
  );
};

export default FlightList;