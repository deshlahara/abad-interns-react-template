import React from 'react';
import { Form, Input, Button, Icon, Col, Row, message } from 'antd';
import PropTypes from 'prop-types';

class CreateUserForm extends React.Component {
  handleCreate = (event) => {
    event.preventDefault();
    const { form, pushNewUser, data } = this.props;
    const newId = data[data.length - 2].id;
    form.validateFields((error, newEntry) => {
      if (!error) {
        // console.log('New Entry: ', newEntry);
        pushNewUser(newEntry, newId); // passing the new id as an array element to newEntry object
        message.success('You are now in Team Xhibit !');
      } else if (error) {
        message.error('Please Fill the form !');
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xl: { span: 5 },
        lg: { span: 5 },
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 8,
        },
      },
    };

    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <section style={{ padding: '25px 50px' }}>
        <Form {...formItemLayout} layout="horizontal" onSubmit={this.handleCreate}>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  type: 'string',
                  required: 'true',
                  message: 'Please fill in your Name !!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.6)' }} />}
                placeholder="eg: Michael Kamble"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [
                {
                  type: 'string',
                  required: 'true',
                  message: 'Try a UNIQUE username !!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.6)' }} />}
                placeholder="@username"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  required: true,
                  message: 'Please provide your Email !!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.6)' }} />}
                placeholder="you@example.com"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item label="Phone">
            {getFieldDecorator('phone', {
              rules: [
                {
                  type: 'string',
                  required: 'true',
                  message: 'Your Mobile Number please ! !!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.6)' }} />}
                placeholder="987654321"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item label="Website">
            {getFieldDecorator('website', {
              rules: [
                {
                  type: 'url',
                  required: 'true',
                  message: 'Please fill a valid URL !!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.6)' }} />}
                placeholder="http://domain.com"
                allowClear
              />,
            )}
          </Form.Item>
          <Row gutter={4}>
            <Form.Item label="Address" help="">
              {getFieldDecorator('address.street', {
                rules: [
                  {
                    type: 'string',
                    required: 'true',
                    message: 'Please give complete address !!',
                  },
                ],
              })(
                <Col span={6}>
                  <Input placeholder="street" />
                </Col>,
              )}
              {getFieldDecorator('address.suite', {
                rules: [
                  {
                    type: 'string',
                    required: 'true',
                    message: 'Please give complete address !!',
                  },
                ],
              })(
                <Col span={6}>
                  <Input placeholder="suite" />
                </Col>,
              )}
              {getFieldDecorator('address.city', {
                rules: [
                  {
                    type: 'string',
                    required: 'true',
                    message: 'Please give complete address !!',
                  },
                ],
              })(
                <Col span={6}>
                  <Input placeholder="city" />
                </Col>,
              )}
              {getFieldDecorator('address.zipcode', {
                rules: [
                  {
                    type: 'string',
                    required: 'true',
                    message: 'Please give complete address !!',
                  },
                ],
              })(
                <Col span={6}>
                  <Input placeholder="zipcode" />
                </Col>,
              )}
            </Form.Item>
          </Row>

          <Form.Item {...tailFormItemLayout}>
            <Button block type="primary" shape="round" size="large" htmlType="submit">
              <span style={{ margin: '0' }}>Create User</span>
            </Button>
          </Form.Item>
        </Form>
      </section>
    );
  }
}

CreateUserForm.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  pushNewUser: PropTypes.func.isRequired,
};

const RegisterForm = Form.create({ name: 'register user' })(CreateUserForm);
export default RegisterForm;
