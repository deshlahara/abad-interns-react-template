/* eslint-disable react/prop-types */
import React from 'react';

import { Modal, Form, Input } from 'antd';
// name of the newly created form inside ()

// eslint-disable-next-line
class Updates extends React.Component {
  onOk = () => {
    const { form, updateLogic } = this.props;

    form.validateFields((error, newData) => {
      // IF CANCEL IS CLICKED
      if (!error) {
        updateLogic(newData);
      }
      // IF UPDATE BUTTTON IS CLICKED THEN THIS LOGIC IS EXECUTED
      // console.log(' UPDATED DETAILS ', newData);
    });
  };

  render() {
    // const { name, email, phone, website } = this.props;

    // data definition
    const { popup, cancelLogic, form } = this.props;
    const { getFieldDecorator } = form; // getFieldDecorator is a function to define form elements
    // const { name, email, phone, website } = this.props.data;
    const { data } = this.props;
    const { name, email, phone, website } = data;

    return (
      <Modal
        visible={popup}
        title="Edit Personal Information" // title of modal
        okText="UPDATE"
        cancelText="CANCEL"
        onCancel={cancelLogic}
        onOk={this.onOk}
        centered
      >
        <Form layout="inline">
          <Form.Item label="Name:" style={{ marginLeft: '2em' }}>
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{ required: true, message: 'Please enter your name !' }],
            })(<Input allowClear />)}
          </Form.Item>

          <Form.Item label="Email: " style={{ marginLeft: '2em' }}>
            {getFieldDecorator('email', {
              initialValue: email, // we need to define initialValue and rules together to set rules on initialValues
              rules: [{ required: true, message: 'Please enter your email !' }],
            })(<Input allowClear />)}
          </Form.Item>

          <Form.Item label="Phone: " style={{ marginLeft: '1.5em' }}>
            {getFieldDecorator('phone', {
              initialValue: phone,
              rules: [{ required: true, message: 'Please enter your phone !' }],
            })(<Input allowClear />)}
          </Form.Item>

          <Form.Item label="Website: " style={{ marginLeft: '1em' }}>
            {getFieldDecorator('website', {
              initialValue: website,
              rules: [{ required: true, message: 'Please enter your website !' }],
            })(<Input allowClear />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'form_in_modal' })(Updates);
