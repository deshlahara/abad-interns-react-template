import React from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import FakeCard from './FakeCard';
import 'antd/dist/antd.css';

class Map extends React.Component {
  render() {
    const { apiData, deleteLogic, globalData, pushNewUser } = this.props;
    return apiData.map((x) => {
      return (
        <Col key={x.id} style={{ padding: '2.2rem' }} md={8} sm={24} lg={8} preloader xs={24} xl={6}>
          {/* FakeCard itself is mapped into a row of cards so that we just need to define a 'Col' to arrange them in the form  of a grid */}

          {/* this.props.deleteLogic uses prop to refer to its parent */}
          <FakeCard
            data={x}
            unique={x.id}
            name={x.name}
            pushNewUser={pushNewUser}
            deleteLogic={deleteLogic}
            globalData={globalData}
          />
        </Col>
      );
    });
  }
}

Map.propTypes = {
  apiData: PropTypes.array.isRequired,
  deleteLogic: PropTypes.func.isRequired,
  globalData: PropTypes.func.isRequired,
  pushNewUser: PropTypes.func.isRequired,
};

export default Map;
