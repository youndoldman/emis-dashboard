import {
    GET_INCIDENTS_SUCCESS,
    GET_INCIDENTS_START,
    GET_INCIDENT_FAILURE,
  } from './actions';
  
  /**
   * Incident reducers
   *
   * @function
   * @name IncidentsType
   *
   * @param {Object} state - Initial state
   * @param {Object} action - Redux action object
   * @param {string} action.type - Action type
   *
   * @version 0.1.0
   * @since 0.1.0
   * */
  
  const initialState = {
    data: [],
    error: null,
  };
  
  export default function Incidents(state = initialState, action) {
    switch (action.type) {
      case GET_INCIDENTS_START:
        return {
          state,
          isLoading: true,
          error: null,
        };
  
      case GET_INCIDENTS_SUCCESS:
        return {
          data: action.payload.data.data,
          error: null,
        };
      case GET_INCIDENT_FAILURE:
        return {
          data: [],
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
  