import {
  GET_ALERTS_START,
  GET_ALERTS_SUCCESS,
  GET_ALERTS_ERROR,
} from './actions';

/**
 * Store keys added by the reducers in this file
 *
 * alertsMap: Object
 * alerts: Object
 * }
 */

/* initial state Alerts Map state */
const defaultAlertsMapState = {
  center: [-6.179, 35.754],
  zoom: 7,
};

/* initial state Alerts state */
const defaultAlertsState = {
  data: [],
  page: 1,
  total: 0,
  loading: false,
  filters: {},
  error: null,
};

/*
 *------------------------------------------------------------------------------
 * AlertsMap  Reducers
 *------------------------------------------------------------------------------
 */

/**
 * AlertsMap reducer
 * Is the field in the store which holds data for the Alerts map.
 *
 * @function
 * @name alertsMap
 *
 * @param {Object} state={} - Initial state
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type
 * @param {Object} action.payload - Action payload
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function alertsMap(state = defaultAlertsMapState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/*
 *------------------------------------------------------------------------------
 * Alerts  Reducers
 *------------------------------------------------------------------------------
 */

/**
 * alerts reducer
 * Is the field in the store which holds data for the Alerts map.
 *
 * @function
 * @name alerts
 *
 * @param {Object} state={} - Initial state
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type
 * @param {Object} action.payload - Action payload
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function alerts(state = defaultAlertsState, action) {
  switch (action.type) {
    case GET_ALERTS_START:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        data: [...action.payload.data],
        page: action.meta.page,
        total: action.meta.total,
        loading: false,
      });
    case GET_ALERTS_ERROR:
      return Object.assign({}, state, {
        error: action.payload.data,
        loading: false,
      });
    default:
      return state;
  }
}
