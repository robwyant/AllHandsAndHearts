/* Login specific types
*/
export const SET_AUTH = 'SET_AUTH'; // set state when logged in/out

export const INITIALIZE_APP_STATE = 'INITIALIZE_APP_STATE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; //when log in is requested
export const LOGIN_REQUEST_LOADING = 'LOGIN_REQUEST_LOADING';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CHANGE_PASSWORD_STATUS_RESET = 'CHANGE_PASSWORD_STATUS_RESET';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'; //when log out is requested
export const LOGOUT_REQUEST_LOADING = 'LOGOUT_REQUEST_LOADING';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST'; //when user is registering
export const REGISTER_REQUEST_LOADING = 'REGISTER_REQUEST_LOADING';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

/**
 * Map specific types
 */

export const REQUEST_ERROR = 'REQUEST_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SENDING_REQUEST = 'SENDING_REQUEST';

export const RESET_TO_MAIN = 'RESET_TO_MAIN';
export const RESET_TO_SIGN_IN = 'RESET_TO_SIGN_IN';

/**
 * Broadcast specific action types
 */

export const REMOVE_BROADCAST_CARD = 'REMOVE_BROADCAST_CARD';
export const REMOVE_BROADCAST_CARD_SUCCESS = 'REMOVE_BROADCAST_CARD_SUCCESS';
export const GET_BROADCAST_CARDS = 'GET_BROADCAST_CARDS';
export const GET_BROADCAST_CARDS_RECEIVED = 'GET_BROADCAST_CARDS_RECEIVED';
export const GET_BROADCAST_CARDS_ON_LOGIN = 'GET_BROADCAST_CARDS_ON_LOGIN';
export const SENDING_BROADCAST_REQUEST = 'SENDING_BROADCAST_REQUEST';

/**
 * ACTIVITY SPECIFIC ACTION TYPES
 */
export const GET_ACTIVITY_CARDS = 'GET_ACTIVITY_CARDS';
export const GET_ACTIVITY_CARDS_RECEIVED = 'GET_ACTIVITY_CARDS_RECEIVED';
export const GET_ACTIVITY_CARDS_ON_LOGIN = 'GET_ACTIVITY_CARDS_ON_LOGIN';

/*
 * REGION SPECIFIC ACTION TYPES
 */
export const GET_REGION_DATA = 'GET_REGION_DATA';
export const GET_REGION_DATA_LOADING = 'GET_REGION_DATA_LOADING';
export const GET_REGION_DATA_RECEIVED = 'GET_REGION_DATA_RECEIVED';
export const GET_REGION_DATA_ERROR = 'GET_REGION_DATA_ERROR';

/*
 * PINS SPECIFIC ACTION TYPES
 */

export const GET_PINS_BY_REGION = 'GET_PINS_BY_REGION';
export const GET_PINS_BY_REGION_LOADING = 'GET_PINS_BY_REGION_LOADING';
export const GET_PINS_BY_REGION_RECEIVED = 'GET_PINS_BY_REGION_RECEIVED';
export const GET_PINS_BY_REGION_ERROR = 'GET_PINS_BY_REGION_ERROR';
export const SET_PINS_BY_REGION = 'SET_PINS_BY_REGION';
export const SET_PINS_BY_REGION_SUCCESS = 'SET_PINS_BY_REGION_SUCCESS';
export const DELETE_PIN_BY_ID = 'DELETE_PIN_BY_ID';
export const GET_PINS_IMAGE_BY_ID = 'GET_PINS_IMAGE_BY_ID';
export const GET_PINS_IMAGE_BY_ID_SUCCESS = 'GET_PINS_IMAGE_BY_ID_SUCCESS';
/**
 * PUSH NOTIFICATIONS SPECIFIC ACTION TYPES
 */

export const REGISTER_PUSH_NOTIFICATION = 'REGISTER_PUSH_NOTIFICATION';
export const REGISTER_PUSH_NOTIFICATION_SUCCESS =
  'REGISTER_PUSH_NOTIFICATION_SUCCESS';
export const REGISTER_PUSH_NOTIFICATION_ERROR =
  'REGISTER_PUSH_NOTIFICATION_ERROR';
