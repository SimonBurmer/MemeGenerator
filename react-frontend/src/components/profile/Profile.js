import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Profile.css';
import UserHistory from './UserHistory';
import UserSettings from './UserSettings';


function Profile() {
  return (
    <Container className="editor-layout-container Profile">
      <Row className="">
        <Col className="">
          <Tabs
            defaultActiveKey="history"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="history" title="History">
              <UserHistory />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <UserSettings />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;