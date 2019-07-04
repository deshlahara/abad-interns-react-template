import React from 'react';

// import "bootstrap/dist/css/bootstrap.css";
import PropTypes from 'prop-types';
import Map from '../components/Map';
import 'antd/dist/antd.css';
// import { HashRouter, Route } from "react-router-dom";

// import EditForm from './EditForm';

// ANT DESIGN IMPORTS
// import {Button} from 'antd';

// const Description = props => <div> {props.description} </div>

const App = (props) => {
  // binding the function in a parent lets us use that functon without an arrow function in its child so that its directly called
  // constructor(props) {
  //   super(props);
  //   this.de  leteLogic = this.deleteLogic.bind(this);
  // }

  // fetching the data from JSON file

  // THIS IS AN APPLICATION OF LIFTING THE STATE UP

  const { data, deleteLogic, globalData, pushNewUser } = props;
  // else condition
  return (
    <div key={data.id}>
      {/* <Button type="button">
                    Click Me!
                </Button> */}
      {/* 
  <Card title="Card title">Card content</Card> */}

      {/* deleteLogic on LHS is a function passed as a prop */}
      {/* <HashRouter> */}
      <Map
        pushNewUser={pushNewUser}
        apiData={data}
        deleteLogic={deleteLogic}
        unique={data.id}
        globalData={globalData}
      />
      {/* <Route path="/" exact component={Map} /> */}

      {/* <div className="container">
        {data.map((entry) => {
          // map is a method of Array that must always use a key for React to understand it
          return (
            <div key={entry.id}>
              <p data={entry}>{entry.name}</p>
              <p data={entry}>{entry.email}</p>
              <p data={entry}>{entry.phone}</p>
              <p data={entry}>{entry.website}</p>
              <hr />
            </div>
          );
        })}
      </div> */}
      {/* </HashRouter> */}
    </div>
  );
};

App.propTypes = {
  data: PropTypes.array.isRequired,
  deleteLogic: PropTypes.func.isRequired,
  globalData: PropTypes.func.isRequired,
  pushNewUser: PropTypes.func.isRequired,
};

export default App;
