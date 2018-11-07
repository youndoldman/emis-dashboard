import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Modal,
  Row,
  Spin,
} from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../../common/components/Toolbar';
import { getPlanActivityProcedures, selectPlanActivity } from '../actions';
import ActivityDetailsBody from './components/ActivityDetails';
import ActivityDetailsHeader from './components/ActivityDetails/components/ActivityDetailsHeader';
import ActivityForm from './components/ActivityForm';
import Phase from './components/PhaseActivities';
import './styles.css';

/* local constants */
const { Header, Content } = Layout;
const { Filters, Actions } = Toolbar;
const spinIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="file-pdf" />
      PDF
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="file-excel" />
      Excel
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="file-text" />
      CSV
    </Menu.Item>
  </Menu>
);

/**
 * Plan Components which arrange plan activities according
 * to their phases
 *
 * @class
 * @name Phases
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlanActivitiesLayout extends Component {
  state = {
    showActivityForm: false,
    showActivityDetails: false,
    initialSelectedPhase: undefined,
  };

  static propTypes = {
    mitigationActivities: PropTypes.arrayOf(
      PropTypes.shape({
        plan: PropTypes.shape({ description: PropTypes.string }),
        incidentType: PropTypes.shape({ name: PropTypes.string }),
        name: PropTypes.string,
        description: PropTypes.string,
        taskCount: PropTypes.number,
      })
    ).isRequired,
    preparednessActivities: PropTypes.arrayOf(
      PropTypes.shape({
        plan: PropTypes.shape({ description: PropTypes.string }),
        incidentType: PropTypes.shape({ name: PropTypes.string }),
        name: PropTypes.string,
        description: PropTypes.string,
        taskCount: PropTypes.number,
      })
    ).isRequired,
    responseActivities: PropTypes.arrayOf(
      PropTypes.shape({
        plan: PropTypes.shape({ description: PropTypes.string }),
        incidentType: PropTypes.shape({ name: PropTypes.string }),
        name: PropTypes.string,
        description: PropTypes.string,
        taskCount: PropTypes.number,
      })
    ).isRequired,
    recoveryActivities: PropTypes.arrayOf(
      PropTypes.shape({
        plan: PropTypes.shape({ description: PropTypes.string }),
        incidentType: PropTypes.shape({ name: PropTypes.string }),
        name: PropTypes.string,
        description: PropTypes.string,
        taskCount: PropTypes.number,
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    onSelectActivity: PropTypes.func.isRequired,
    getActivityProcedures: PropTypes.func.isRequired,
  };

  /**
   * Open drawer which contains action form
   *
   * @function
   * @name handleOpenActivityForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOpenActivityForm = (initialPhase = undefined) => {
    this.setState({
      showActivityForm: true,
      initialSelectedPhase: initialPhase,
    });
  };

  /**
   * Close drawer which contains action form
   *
   * @function
   * @name handleCloseActivityForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleCloseActivityForm = () => {
    this.setState({
      showActivityForm: false,
    });
  };

  /**
   * Handle Open Activity details drawer event
   *
   * @function
   * @name handleOpenActivityDetails
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOpenActivityDetails = activity => {
    const { onSelectActivity, getActivityProcedures } = this.props;
    onSelectActivity(activity);
    getActivityProcedures();
    this.setState({ showActivityDetails: true });
  };

  /**
   * Handle Close Activity details drawer event
   *
   * @function
   * @name handleCloseActivityDetails
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleCloseActivityDetails = () => {
    this.setState({ showActivityDetails: false });
  };

  render() {
    const {
      showActivityForm,
      showActivityDetails,
      initialSelectedPhase,
    } = this.state;

    const {
      mitigationActivities,
      preparednessActivities,
      responseActivities,
      recoveryActivities,
      loading,
    } = this.props;

    return (
      <Spin
        indicator={spinIcon}
        size="large"
        tip="Loading Activities ..."
        spinning={loading}
        style={{ top: '30%' }}
      >
        <Layout className="PlanActivitiesLayout">
          {/* start primary header */}
          <Header className="header">
            <h3>Plans</h3>
          </Header>
          {/* end primary header */}
          {/* Toolbar */}
          <Toolbar>
            <Filters span={18} />
            <Actions span={6}>
              <Row type="flex" justify="end">
                <Col span={10}>
                  <Button
                    title="Create New Activity"
                    icon="plus"
                    type="primary"
                    onClick={() => {
                      this.handleOpenActivityForm();
                    }}
                  >
                    New Activity
                  </Button>
                </Col>
                <Col span={10}>
                  <Dropdown overlay={menu}>
                    <Button
                      title="Export Selected Plan"
                      className="exportButton"
                      type="primary"
                    >
                      <Icon type="export" />
                      Export
                      <Icon type="down" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </Actions>
          </Toolbar>
          {/* end Toolbar */}
          {/* start plan actions */}
          <Content className="content">
            <Row className="sectionLayout">
              <Col span={6} className="section section-b-r">
                <Phase
                  title="Mitigation"
                  count={20}
                  activities={mitigationActivities}
                  onClickCard={this.handleOpenActivityDetails}
                  onClickAddActivity={this.handleOpenActivityForm}
                />
              </Col>
              <Col span={6} className="section section-b-r">
                <Phase
                  title="Preparedness"
                  count={5}
                  activities={preparednessActivities}
                  onClickCard={this.handleOpenActivityDetails}
                  onClickAddActivity={this.handleOpenActivityForm}
                />
              </Col>
              <Col span={6} className="section section-b-r">
                <Phase
                  title="Response"
                  count={30}
                  activities={responseActivities}
                  onClickCard={this.handleOpenActivityDetails}
                  onClickAddActivity={this.handleOpenActivityForm}
                />
              </Col>
              <Col span={6} className="section">
                <Phase
                  title="Recovery"
                  count={40}
                  activities={recoveryActivities}
                  onClickCard={this.handleOpenActivityDetails}
                  onClickAddActivity={this.handleOpenActivityForm}
                />
              </Col>
            </Row>
          </Content>
          {/* end plan actions */}
          {/* Drawer for plan form */}
          <Drawer
            title={<ActivityDetailsHeader />}
            placement="right"
            width="100%"
            onClose={this.handleCloseActivityDetails}
            visible={showActivityDetails}
          >
            <ActivityDetailsBody />
          </Drawer>
          {/* end Drawer for plan form */}
          {/* Activity form modal */}
          <Modal
            visible={showActivityForm}
            title={
              initialSelectedPhase
                ? `Add New Activity in ${initialSelectedPhase} phase`
                : 'Add New Activity'
            }
            maskClosable={false}
            onCancel={this.handleCloseActivityForm}
            footer={null}
          >
            <ActivityForm
              onCancel={this.handleCloseActivityForm}
              initialSelectedPhase={initialSelectedPhase}
            />
          </Modal>
          {/* End Activity form modal */}
        </Layout>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  mitigationActivities: state.planActivities.Mitigation,
  preparednessActivities: state.planActivities.Preparedness,
  responseActivities: state.planActivities.Response,
  recoveryActivities: state.planActivities.Recovery,
  loading: state.planActivities.loading,
});

const mapDispatchToProps = dispatch => ({
  onSelectActivity(activity) {
    dispatch(selectPlanActivity(activity));
  },
  getActivityProcedures() {
    dispatch(getPlanActivityProcedures());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanActivitiesLayout);
