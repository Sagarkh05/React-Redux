const redux = require('redux');
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';
let initCakeState = {
  numberOfcakes: 10,
}

let initIcecreamState = {
  numberOfIcecream: 20
}
function buyCakeAction() {
  return {
    type: BUY_CAKE,
    info: 'Birthday cake'
  }
}
function buyIcecreamAction() {
  return {
    type: BUY_ICE_CREAM,
    info: 'Venilla icecream'
  }
}

let cakeReducer = (state = initCakeState, action) => {
   switch(action.type) {
    case BUY_CAKE :
     return { ...state , numberOfcakes: state.numberOfcakes - 1}
    default: 
     return state
   }
}

let IcecreamReducer = (state = initIcecreamState, action) => {
  switch(action.type) {
   case BUY_ICE_CREAM :
    return { ...state , numberOfIcecream: state.numberOfIcecream - 1}
   default: 
    return state
  }
}
const rootReducer = redux.combineReducers({
 cake: cakeReducer, 
 icecream: IcecreamReducer})
const store = redux.createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(()=>{
})
store.dispatch(buyCakeAction());
store.dispatch(buyCakeAction());
store.dispatch(buyCakeAction());
store.dispatch(buyIcecreamAction());
store.dispatch(buyIcecreamAction());
unsubscribe();

