import React, { useState } from 'react';
import { Form, Input, Checkbox, DatePicker, Row, Col } from 'antd';
import moment from 'moment';


const { RangePicker } = DatePicker;

const SearchForm = ({  onSearch }) => {
  const [form] = Form.useForm();
  const [oneWay, setOneWay] = useState(true);

  const onFinish = (values) => {
    onSearch(values);
  };

  const handleCheckboxChange = (e) => {
    setOneWay(e.target.checked);

    // "Tek yönlü uçuş" seçeneği seçildiyse dönüş tarihini sıfırla
    if (e.target.checked) {
      form.setFieldsValue({
        returnDate: null,
      });
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    // Tetiklenen her değişiklikte, ana uygulamadaki onSearch fonksiyonunu çağırarak uçuşları filtreleyin.
    onSearch(allValues);
    
  };


  return (
    <div style={{ maxWidth: '60%', margin: 'auto',padding:"40px" }}>
      <Form form={form} onValuesChange={onValuesChange} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Departure City" name="departureAirport" rules={[{ required: true, message: 'Lütfen kalkış havaalanını girin.' }]}>
              <Input placeholder='Istanbul' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Arrival City" name="arrivalAirport" rules={[{ required: true, message: 'Lütfen varış havaalanını girin.' }]}>
              <Input placeholder='Paris' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Flight Type">
              <Checkbox name="oneWay" checked={oneWay} onChange={handleCheckboxChange}>
              One Way
              </Checkbox>
              <Checkbox name="roundTrip" checked={!oneWay} onChange={() => setOneWay(!oneWay)}>
              Round Trip
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Departure Date" name="departureDate" rules={[{ required: true, message: 'Lütfen gidiş tarihini girin.' }]}>
              <DatePicker showTime={false} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          {!oneWay && (
            <Col xs={24} sm={12}>
              <Form.Item label="Return Date" name="returnDate" rules={[{ required: true, message: 'Lütfen dönüş tarihini girin.' }]}>
                <DatePicker showTime={false} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
     
    </div>
  );
};

export default SearchForm;
