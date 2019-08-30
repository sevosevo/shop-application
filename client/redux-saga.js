const { Component } = React
const { Provider, connect } = ReactRedux
const { createStore, applyMiddleware } = Redux
const { takeEvery, takeLatest, delay } = ReduxSaga
const { put, call } = ReduxSaga.effects
const createSagaMiddleware = ReduxSaga.default

const [LOGIN] = ['LOGIN'];

function* rootSaga() {
 
  yield takeEvery(LOGIN, sagaLogin);  

};
  
function login() {
  return {
    type: LOGIN
  }
}
  
function* sagaLogin(seconds) {
  //Async call
 const user = yield increment(seconds);
 //Dispatch
 yield put({ type: INCREMENT, user });
} 

function increment(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve();
    }, seconds * 1000 );
  })
  .then(() => {
    return {
      name: 'Sevo',
      password: 'sevo1389'
    }
  }); //Simulate async call to backend 
}

const reducer = (state = null, action) => {
   switch(action){
     case LOGIN: 
      return action.user
     default:
      return state;
   }
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(
  reducer,
  applyMiddleware(...midlewares)
);
sagaMiddleware.run(rootSaga);



// Main App Container
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button>Login</button>
        User:
          {
          user && <span>Username: {user.name} Password: {user.password}</span>
          }
      </div>
     )
  } 
}


// Mapping states to properties
const mapStateToProps = state => ({
  user: state
})
// Mapping action creators to properties
const mapDispatchToProps = ({
  login
})
// Container connected to redux
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

// Container that provides App to be connected to the redux
const Main = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

// Render the application
ReactDOM.render(<Main />, document.getElementById('app'))
