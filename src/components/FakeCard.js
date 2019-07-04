// imports first
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Row, Col } from 'antd';
import Updates from '../forms/Updates';
// import { Modal, Form, Input } from 'antd';

// import Forms from './Forms';

// const after imports
const { Meta } = Card;

class FakeCard extends Component {
  constructor(props) {
    // passing state as props
    super(props);

    this.onIconClick = this.onIconClick.bind(this); // bind is needed to use this in callback
    this.showModal = this.showModal.bind(this); // this shows the modal on click of edit icon
    // this.deleteLogic = this.deleteLogic.bind(this);
    const { data } = this.props;
    const { name, email, phone, website } = data;

    // this.deleteRef = React.createRef();

    this.state = {
      toggle: true, // ICON TOGGLE
      // popup: false,
      popup: false, // MODAL POPUP
      // eslint-disable-next-line react/no-unused-state
      name, // name on RHS is the JSON data prop that's destructured
      email,
      phone,
      website,
      showName: true,
      showEmail: true,
      showPhone: true,
      showWeb: true,
      showImg: true,
    };
  }
  // state = {icon: <Icon type="heart" theme="twoTone" twoToneColor="red" />}
  // const {}

  onIconClick = () => {
    // e.preventDefault();
    this.setState((state) => ({
      // state is a callback that is called and checks the current state of the icon anf toggles it
      toggle: !state.toggle, // this sees the toggle state as TRUE / FALSE and re-renders the state as per state
    }));
  };

  hideName = (n) => {
    n.preventDefault();
    this.setState((nameState) => ({
      showName: !nameState.showName,
    }));
  };

  hideEmail = (e) => {
    e.preventDefault();
    this.setState((emailState) => ({
      showEmail: !emailState.showEmail,
    }));
  };

  hidePhone = (p) => {
    p.preventDefault();
    this.setState((phoneState) => ({
      showPhone: !phoneState.showPhone,
    }));
  };

  hideWeb = (w) => {
    w.preventDefault();
    this.setState((webState) => ({
      showWeb: !webState.showWeb,
    }));
  };

  hideImage = (i) => {
    i.preventDefault();
    this.setState((imgState) => ({
      showImg: !imgState.showImg,
    }));
  };

  // showModal = popup => {
  //   this.setState({ popup });
  // };

  showModal = () => {
    this.setState({
      popup: true,
    });
  };

  cancelLogic = () => {
    this.setState({ popup: false });
  };

  // this logic saves the form details into card
  // updateFormRef = (formRef) => {
  //   // saveFormRef is a prop
  //   this.formRef = formRef;
  // };

  // LOGIC TO UPDATE THE DETAILS
  updateLogic = (newData) => {
    const { globalData, data } = this.props;
    this.setState({
      popup: false,
    });
    // const { form } = this.formRef.props; // form on LHS is used in next line to validate the fields entered and form on both LHS and RHS are different
    // validating the form fields
    globalData(newData, data.id);
  };

  // delete logic

  render() {
    const { showImg, toggle, popup, showName, showEmail, showPhone, showWeb, email, phone, website } = this.state;
    const { deleteLogic, name, data } = this.props;
    // const { name, email, phone, website } = this.props.data; // destructuring the props data
    const profile = (
      <img
        style={{ backgroundColor: '#F5F5F5' }}
        alt="example"
        src={`https://avatars.dicebear.com/v2/avataaars/${data.username}.svg?options[mood][]=happy`}
      />
    );
    const profileThen = <img className="ant-card-cover" height="268px" style={{ backgroundColor: '#F5F5F5' }} alt="" />;

    return (
      <Row>
        <Card
          style={{ width: '270px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}
          cover={showImg ? profile : profileThen}
          actions={[
            // this checks state of icon and toggles it as per the boolean value

            <Icon
              type="heart"
              theme={toggle ? 'outlined' : 'filled'}
              style={{ color: 'red' }}
              twoToneColor="red"
              onClick={(e) => this.onIconClick(e)}
            />,

            // callback that activates the modal on screen
            <Icon type="edit" onClick={this.showModal} />,

            // callback () is used to update the state of cards when icon is clicked
            // so if () is not defined, then it directly filters the cards and removes then on initial render
            // argument called inside deleteLogic() as this.props.key is refering to its parent ie <Map />
            <Icon type="delete" theme="filled" onClick={() => deleteLogic(name)} />,

            <Icon type="eye" theme={showImg ? 'outlined' : 'filled'} onClick={(i) => this.hideImage(i)} />,
          ]}

          // card end
        >
          {/* <Modal
              title="Edit Personal Information"
              centered  // centered on screen 
              visible={this.state.popup}  // this prop shows the modal on screen by reverting the current value of state : false
              onOk={() => this.showModal(false)}  // OK BUTTON
              onCancel={() => this.showModal(false)}  // CANCEL BUTTON
            >

            </Modal> */}
          <Updates
            // wrappedComponentRef={this.updateFormRef}
            popup={popup}
            cancelLogic={this.cancelLogic}
            updateLogic={this.updateLogic}
            data={data}
            name={data.name}
            email={data.email}
            phone={data.phone}
            website={data.website}
          />

          <Row>
            <Col span={23}>
              <Meta title={showName ? name : null} />
            </Col>
            <Col span={1}>
              <Meta avatar={<Icon type="eye" />} onClick={(n) => this.hideName(n)} />
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: '1em' }} span={3}>
              <Meta avatar={showEmail ? <Icon type="mail" /> : null} />
              <Meta avatar={showPhone ? <Icon type="phone" /> : null} />
              <Meta style={{ margin: 0 }} avatar={showWeb ? <Icon type="global" /> : null} />
            </Col>
            <Col span={20} style={{ marginTop: '1.2em' }}>
              <Meta className="meta" avatar={showEmail ? email : null} />
              <Meta className="meta" style={{ margin: 0 }} avatar={showPhone ? phone : null} />
              <Meta className="meta" style={{ margin: 0 }} avatar={showWeb ? website : null} />
            </Col>

            <Col style={{ marginTop: '0.6em' }} span={1}>
              <Icon type="eye" onClick={(e) => this.hideEmail(e)} />
              <Icon type="eye" onClick={(p) => this.hidePhone(p)} />
              <Icon type="eye" onClick={(w) => this.hideWeb(w)} />
            </Col>
          </Row>
        </Card>
      </Row>
    );
  }
}

FakeCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
  globalData: PropTypes.func.isRequired,
  deleteLogic: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default FakeCard;
