import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import SidebarSettings from '../SidebarSettings';
import { Button, Col, Input, Row, Layout, Checkbox } from 'antd';

/* load styles */
import styles from './styles.css';
import IncidentType from '../SystemSettings/Components/IncidentTypeList';
import IncidentDetails from '../SystemSettings/Components/IncidentDetails';
import AddnewIncidentType from '../SystemSettings/Components/IncidentTypeForm/AddNewIncidentType';
import EditIncidentType from '../SystemSettings/Components/IncidentTypeForm/EditIncidentType';

/* local constants */
const { Header, Content } = Layout;
const { Search } = Input;
const cx = classnames.bind(styles);

/**
* Search function
* 
**/
const SettingsLayout = (props)=>  {
  
  return  (
    <Layout
      style={{
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #e6e6e6'

      }}
    >
      <Row>
        <Col span={4} className={cx('section')}>
          <Header className={cx('ContentHeader')}>
          </Header>
          <Content>
            <SidebarSettings title="System" />
          </Content>
        </Col>
        <Col span={6} className={cx('section')}>
          <Header className={cx('ContentHeader')}>
            <Row type="flex" justify="space-around">
              <Col span={2}>
                <Checkbox />
              </Col>
              <Col span={22}>
                <Search
                  placeholder="Search here"
                  onSearch={value => console.log(value)}
                  style={{ width: '100%' }}
                  enterButton={<Button icon="search" />}
                />
              </Col>
            </Row>
          </Header>
          <Content>
            <IncidentType />
          </Content>
        </Col>
        <Col span={14} className={cx('section')}>
          <Header className={cx('ContentHeader')}>
            <Row>
              <Col span={1}>
                <AddnewIncidentType />
              </Col>
              <Col span={1}>
              <EditIncidentType />
              </Col>

              <Col span={21}>
                <h3>
                  Basic Information
              </h3>
              </Col>
            </Row>
          </Header>
          <Content>
            <IncidentDetails />
          </Content>
        </Col>

      </Row>
    </Layout>
  )
}
const mapStateToProps = state => ({
  incidentsType: state.incidentsType.data,
});

export default connect(mapStateToProps)(SettingsLayout);

