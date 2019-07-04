import React from 'react';
import axios from 'axios';
import { Layout, Menu, Icon } from 'antd';
import { HashRouter, Route, Link } from 'react-router-dom';
import Spinner from './Spinner';
import App from '../pages/App';
import UserTable from '../pages/UserTable';
import CreateUserForm from '../forms/CreateUserForm';
// import PropTypes from 'prop-types';
// import { OmitProps } from 'antd/lib/transfer/renderListBody';

const { Header, Content } = Layout;

class Nav extends React.Component {
  state = { currentKey: '1', data: [], preloader: true };

  componentDidMount = async () => {
    const api = await axios.get(`https://jsonplaceholder.typicode.com/users`);

    // console.log(api.data);

    // updating the state
    this.setState({ data: api.data, preloader: false });
  };

  navClick = (click) => {
    // console.log(click);
    this.setState({
      currentKey: click.key,
    });
  };

  deleteLogic = (allCards) => {
    const { data } = this.state;
    // SLICE MEANS TO DELETE THE CURRENT AND SHOW THE REST
    // this is amazing. slice() method actually slices the itmes in array.
    // if 1 is passed as arg, then it deletes / slices the 1st value and returns the array of remaining items
    const cards = data.filter((e) => e.name !== allCards); // currentCard => currentCard.name !== allCards
    this.setState({
      data: [...cards],
    });
  };

  globalData = (newData, nameId) => {
    const { data } = this.state;
    // console.log(newData);
    // console.log(nameId);

    // usage of union operator
    const [...globalData] = data.map((jsonData) => {
      if (jsonData.id === nameId) {
        return { ...jsonData, ...newData };
      }

      return jsonData;
    });
    this.setState({
      data: globalData,
    });
  };

  pushNewUser = (newEntry, newId) => {
    const { data } = this.state;
    const latest = [{ ...newEntry, id: newId + 2 }];
    const [...updatedData] = [...data, ...latest];
    // console.log(updatedData);
    this.setState({
      data: updatedData,
    });
  };

  render() {
    const { currentKey, preloader, data } = this.state;

    const formItemLayout = {
      labelcol: {
        xl: { span: 6 },
        lg: { span: 6 },
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrappercol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    if (preloader) {
      return <Spinner msg="Loading..." />;
    }

    return (
      <div>
        <HashRouter>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                {...formItemLayout}
                onClick={this.navClick}
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentKey]}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">
                  <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                    <Icon type="user" style={{ fontSize: '2em' }} />
                    <span>People</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link style={{ color: 'white', textDecoration: 'none' }} to="/userTable">
                    <Icon type="database" style={{ fontSize: '2em' }} />
                    <span>Statistics</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="3">
                  <Link style={{ color: 'white', textDecoration: 'none' }} to="/registerUser">
                    <Icon type="plus-circle" style={{ fontSize: '2em' }} />
                    <span>Create User</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>

          <Content>
            <Route
              path="/"
              exact
              component={() => (
                <App
                  pushNewUser={this.pushNewUser}
                  data={data}
                  deleteLogic={this.deleteLogic}
                  globalData={this.globalData}
                />
              )}
            />
            <Route path="/userTable" exact component={() => <UserTable data={data} />} />
            <Route
              path="/registerUser"
              exact
              component={() => <CreateUserForm data={data} pushNewUser={this.pushNewUser} />}
            />
          </Content>
        </HashRouter>
      </div>
    );
  }
}

export default Nav;
