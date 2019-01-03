import React, { Component } from "react";
import { Button, Input, Form, Row, Col, Collapse } from "./components/design";

const Panel = Collapse.Panel;

const data = [
  { domain: "https://www.google.com", status: "done" },
  { domain: "https://www.facebook.com", status: "done" },
  { domain: "https://www.amazon.com", status: "done" },
  { domain: "https://www.youtube.com", status: "syncing" },
  { domain: "https://www.reddit.com", status: "syncing" }
];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col>
            <h1>Url Monitor</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <Form layout="inline">
              <Form.Item>
                <Input placeholder="URL" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Collapse style={{ width: "50%", marginTop: "1em" }} accordion>
            {data.map((item, index) => (
              <Panel header={item.domain} key={index}>
                <p>{item.domain}</p>
              </Panel>
            ))}
          </Collapse>
        </Row>
      </React.Fragment>
    );
  }
}

export default App;
