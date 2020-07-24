const redux = require('redux');
const axios = require('axios');
const thunk = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

let initiateState = {
  loading: true,
  user: [],
  error: false
}

const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS';
const SUCCESS_USER_DETAILS = 'SUCCESS_USER_DETAILS';
const ERROR_USER_DETAILS = 'ERROR_USER_DETAILS';

function fetchUserDetails() {
 return{
    type: FETCH_USER_DETAILS
 }
}
function successUserDetails(data) {
  return{
    type: SUCCESS_USER_DETAILS,
    payload: data
  }
}
function errorUserDetails(error) {
  return{
    type: ERROR_USER_DETAILS,
    payload: error
  }
}

function fatchAction () {
  return (dispatch) => {
     dispatch(fetchUserDetails());
   axios.get('https://jsonplaceholder.typicode.com/todos/1')
   .then((res) => {
     dispatch(successUserDetails(res.data));
   })
   .catch((error) => {
     dispatch(errorUserDetails(error));
   })
  }
}

const reducer = (state = initiateState, action) => {
   switch(action.type) {
      case FETCH_USER_DETAILS :
        state.loading = true;
        return state;
      case SUCCESS_USER_DETAILS :
        state.user = action.payload;
        state.error = '';
        state.loading = false;
        return state;
      case ERROR_USER_DETAILS :
        state.error = action.payload;
        state.user = []
        state.loading = false;
        return state;
   }
}


 const store = createStore(reducer, applyMiddleware(thunk));
 store.subscribe(()=> {console.log(store.getState())})
 store.dispatch(fatchAction())
