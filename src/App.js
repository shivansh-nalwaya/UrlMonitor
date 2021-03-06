import React, { Component } from "react";
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  Collapse,
  Icon,
  Select,
  Spin
} from "./components/design";
import { LineChart } from "react-chartkick";
import UrlStore from "./store/Urls";
import { observer } from "mobx-react";

const Panel = Collapse.Panel;
const Option = Select.Option;
const Search = Input.Search;

const Header = props => {
  return (
    <Row type="flex" justify="space-between" style={{ marginRight: "1em" }}>
      <Col>{props.item.url}</Col>
      <Col>
        <Icon
          type={props.item.sync_status ? "check" : "sync"}
          spin={!props.item.sync_status}
          style={
            props.item.sync_status ? { color: "green" } : { color: "grey" }
          }
        />
        <Button
          style={{ marginLeft: "1em" }}
          onClick={() => {
            UrlStore.deleteData(props.item._id);
          }}
          type="danger"
          shape="circle"
          icon="delete"
        />
      </Col>
    </Row>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      preUrl: "https://"
    };
  }

  selectBefore = (
    <Select
      defaultValue="https://"
      onChange={preUrl => {
        this.setState({ preUrl });
      }}
    >
      <Option value="https://">https://</Option>
      <Option value="http://">http://</Option>
    </Select>
  );

  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-around" style={{ paddingTop: "1em" }}>
          <Col>
            <h1>Url Monitor</h1>
          </Col>
          <Col>
            <Form layout="inline">
              <Form.Item>
                <Search
                  placeholder="URL"
                  addonBefore={this.selectBefore}
                  value={this.state.url}
                  enterButton="Add"
                  onChange={e => this.setState({ url: e.target.value })}
                  onSearch={() => {
                    UrlStore.addData(this.state.preUrl + this.state.url);
                    this.setState({ url: "" });
                  }}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "1em" }}>
          <Col lg={22} md={22} sm={24} xs={24}>
            <Spin spinning={UrlStore.isLoading}>
              <Collapse accordion>
                {UrlStore.data.map(item => (
                  <Panel header={<Header item={item} />} key={item._id}>
                    <div style={{ marginLeft: "-5%", marginTop: "-3%" }}>
                      <LineChart
                        xtitle="Time"
                        ytitle="Response Time (ms.)"
                        width="110%"
                        data={UrlStore.convert(item.responses)}
                      />
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </Spin>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default observer(App);
