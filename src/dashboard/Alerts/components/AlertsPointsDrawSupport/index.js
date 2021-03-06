import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import L from 'leaflet';
import PropTypes from 'prop-types';
import MapPointsDrawSupport from '../../../../common/components/MapPointsDrawSupport';
import {
  getSelectedAlertFromState,
  showSeleteAlertShape,
  showAlertPoints,
} from '../../actions';
import {
  isoDateToHumanReadableDate,
  generateSvgIconUrl,
  formatAlertFieldType,
} from '../../helpers';

/**
 * Wrraper component for Supporting  drawing of Alerts shapes (Eg. Polygons, Cirles and Points)
 * on map
 * This component must be Child of map component to enable its children
 * to access map context
 *
 * @class
 * @name AlertsDrawSupport
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertsPointsDrawSupport extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    showPoints: PropTypes.bool.isRequired,
    points: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        properties: PropTypes.shape({
          id: PropTypes.string,
        }),
        geometry: PropTypes.shape({
          type: PropTypes.string,
          coordinates: PropTypes.arrayOf(PropTypes.number),
        }),
      })
    ),
  };

  static defaultProps = {
    points: [],
  };

  constructor(props) {
    super(props);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  onMarkerClicked = id => {
    const { history } = this.props;
    history.push(`/alerts/${id}`);
  };

  showMarkers = (feature, latlng) => {
    const { properties } = feature;
    const { color } = properties;
    const iconUrl = generateSvgIconUrl(color);
    const CustomIcon = L.Icon.extend({
      options: {
        iconSize: [40, 40],
        iconAnchor: [15, 30],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -25],
      },
    });

    const icon = new CustomIcon({ iconUrl });

    return L.marker(latlng, { icon });
  };

  onEachFeature = (feature, layer) => {
    const {
      properties: { event, expectedAt, id },
    } = feature;
    layer
      .on({
        click: () => {
          this.onMarkerClicked(id);
        },
      })
      .bindTooltip(
        `<div><div><strong>Event:</strong> ${event}</div><div><strong>${formatAlertFieldType(
          'expectedAt'
        )}</strong>: ${isoDateToHumanReadableDate(expectedAt)}</div></div>`
      )
      .openTooltip();
  };

  render() {
    const { points, showPoints } = this.props;
    return (
      <React.Fragment>
        <MapPointsDrawSupport
          isShowPoints={showPoints}
          points={points}
          pointToLayer={this.showMarkers}
          onEachFeature={this.onEachFeature}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  points: state.alertsMap.points,
  shapes: state.alertsMap.shapes,
  showPoints: state.alertsMap.showPoints,
  showShapes: state.alertsMap.showShapes,
});

const mapDispatchToProps = {
  selectAlert: getSelectedAlertFromState,
  onClickShowPoints: showAlertPoints,
  onClickShowShapes: showSeleteAlertShape,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AlertsPointsDrawSupport));
