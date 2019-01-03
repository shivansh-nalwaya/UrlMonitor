import React, { Component } from "react";
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  Collapse,
  Icon
} from "./components/design";
import { LineChart } from "react-chartkick";
import UrlStore from "./store/Urls";
import { observer } from "mobx-react";
const Panel = Collapse.Panel;

const Header = props => {
  return (
    <Row type="flex" justify="space-between" style={{ paddingRight: "1em" }}>
      <Col>{props.item.domain}</Col>
      <Col>
        <Icon
          type={props.item.status === "syncing" ? "sync" : "check"}
          spin={props.item.status === "syncing"}
          style={
            props.item.status === "syncing"
              ? { color: "grey" }
              : { color: "green" }
          }
        />
      </Col>
    </Row>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }

  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-around" style={{ marginTop: "1em" }}>
          <Col>
            <h1>Url Monitor</h1>
          </Col>
          <Col>
            <Form layout="inline">
              <Form.Item>
                <Input
                  placeholder="URL"
                  value={this.state.url}
                  onChange={url => this.setState({ url: url.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    UrlStore.addData(this.state.url);
                    this.setState({ url: "" });
                  }}
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Collapse style={{ width: "75%", marginTop: "1em" }} accordion>
            {UrlStore.data.map((item, index) => (
              <Panel header={<Header item={item} />} key={index}>
                <LineChart data={{ 1: 11, 2: 6 }} />
              </Panel>
            ))}
          </Collapse>
        </Row>
      </React.Fragment>
    );
  }
}

export default observer(App);
