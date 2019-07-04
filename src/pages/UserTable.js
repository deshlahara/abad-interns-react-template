import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

class UserTable extends Component {
  state = { query: 'search anything...' };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        // eslint-disable-next-line react/destructuring-assignment
        searchWords={[this.state.query]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ query: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ query: '' });
  };

  render() {
    const { data } = this.props;
    const columns = [
      {
        title: 'Sr. No',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        ...this.getColumnSearchProps('username'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        filters: [
          {
            text: '.com',
            value: 'conrad.com',
          },
          {
            text: '.org',
            value: 'hildegard.org',
          },
          {
            text: '.biz',
            value: 'kale.biz',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.website.indexOf(value) === 0,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '35%',
        render: (address) => (
          <span>
            <span>{address.street} , </span>
            <span>{address.suite} , </span>
            <span>{address.city} , </span>
            <span>{address.zipcode}</span>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Table rowKey={(dataId) => dataId.id} columns={columns} dataSource={data} />
      </div>
    );
  }
}

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default UserTable;
